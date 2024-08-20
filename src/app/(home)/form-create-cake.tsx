import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createCake } from '@/http/create-cake'
import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'

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

export function FormCreateCake() {
  const queryClient = useQueryClient()

  const { register, handleSubmit } = useForm<CakeFormData>({
    resolver: zodResolver(cakeSchema),
  })

  const { mutateAsync: createCakeFn } = useMutation({
    mutationFn: createCake,
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
      await createCakeFn({
        flavor,
        filling,
        description,
        price,
        isSolded: isSolded ?? false,
        isSpecialFlavor: isSpecialFlavor ?? false,
        quantity: quantity ?? 1,
      })

      toast.success('Bolo cadastrado com sucesso!')
    } catch (err) {
      console.error(err)

      toast.error(
        'Houve um erro ao cadastrar o bolo, por favor tente novamente.',
      )
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateCake)}
      className="flex flex-col gap-6"
    >
      <Label>Sabor</Label>
      <Input placeholder="Digite o sabor do bolo" {...register('flavor')} />

      <Label>Recheio</Label>
      <Input placeholder="Digite o recheio do bolo" {...register('filling')} />

      <Label>Preço</Label>
      <Input
        placeholder="Digite o preço do bolo a ser cobrado"
        type="number"
        {...register('price')}
      />

      <Label>Descrição</Label>
      <Textarea
        placeholder="Uma breve descrição do bolo"
        {...register('description')}
      />

      <Button type="submit" className="bg-violet-500 hover:bg-violet-600">
        Cadastrar
      </Button>
    </form>
  )
}
