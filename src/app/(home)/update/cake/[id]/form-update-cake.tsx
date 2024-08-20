'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCake } from '@/http/update-cake'
import { Separator } from '@/components/ui/separator'

import dayjs from 'dayjs'

interface UpdateCakeProps {
  cake: {
    id: string
    flavor: string
    filling: string
    description: string
    quantity: number
    price: number
    isSpecialFlavor: boolean | null
    isSolded: boolean | null
    createdAt: string
    updatedAt: string
  }
}

const cakeSchema = z.object({
  flavor: z.string().min(1, { message: 'Campo obrigatório' }),
  filling: z.string().min(1, { message: 'Campo obrigatório' }),
  price: z.coerce.number().min(1, { message: 'Campo obrigatório' }),
  quantity: z.number().nullable().optional(),
  isSolded: z.boolean().optional().default(false),
  isSpecialFlavor: z.boolean().optional().default(false),
  description: z.string().min(5, { message: 'Digite pelo meos 5 caracteres' }),
})

type CakeFormData = z.infer<typeof cakeSchema>

export function FormUpdateCake({ cake }: UpdateCakeProps) {
  const queryClient = useQueryClient()

  const { register, handleSubmit } = useForm<CakeFormData>({
    resolver: zodResolver(cakeSchema),
    defaultValues: {
      flavor: cake.flavor,
      filling: cake.filling,
      description: cake.description,
      price: cake.price,
    },
  })

  const { mutateAsync: updateCakeFn } = useMutation({
    mutationFn: updateCake,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['cakes'], type: 'active' })
    },
  })

  async function handleCreateCake(data: CakeFormData) {
    const {
      flavor,
      filling,
      description,
      price,
      isSolded,
      isSpecialFlavor,
      quantity,
    } = data

    try {
      await updateCakeFn({
        cakeId: cake.id,
        flavor,
        filling,
        description,
        price,
        isSolded: isSolded ?? false,
        isSpecialFlavor: isSpecialFlavor ?? false,
        quantity: quantity ?? 1,
      })

      toast.success('Bolo atualizado com sucesso!')
    } catch (err) {
      console.error(err)

      toast.error(
        'Houve um erro ao atualizar o bolo, por favor tente novamente.',
      )
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateCake)}
      className="flex flex-col gap-6 w-[35rem]"
    >
      <div className="flex flex-col items-center gap-2">
        <span className="text-zinc-400">
          Criado em{' '}
          <span className="font-bold text-zinc-100">
            {dayjs(cake.createdAt).format('DD/MM/YYYY')}
          </span>
        </span>
        <span className="text-zinc-400">
          Quantidade total:{' '}
          <span className="font-bold text-zinc-100">{cake.quantity}</span>
        </span>
      </div>

      <Separator className="my-6" />

      <Label>Sabor</Label>
      <Input
        className="w-full"
        placeholder="Digite o sabor do bolo"
        {...register('flavor')}
      />

      <Label>Recheio</Label>
      <Input placeholder="Digite o recheio do bolo" {...register('filling')} />

      <Label>Preço</Label>
      <Input
        placeholder="Digite o preço do bolo a ser cobrado"
        {...register('price')}
      />

      <Label>Descrição</Label>
      <Textarea
        placeholder="Uma breve descrição do bolo"
        {...register('description')}
      />

      <Button type="submit" className="bg-violet-500 hover:bg-violet-600">
        Atualizar
      </Button>
    </form>
  )
}
