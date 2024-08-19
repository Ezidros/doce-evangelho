'use client'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { addCakes } from '@/http/add-new-cake-count'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

interface AddCakeProps {
  cakeId: string
  flavor: string
  filling: string
}

const addCakeSchema = z.object({
  quantity: z.coerce.number().nullable(),
})

type AddCakeFormData = z.infer<typeof addCakeSchema>

export function AddCake({ cakeId, flavor, filling }: AddCakeProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCakeFormData>({
    resolver: zodResolver(addCakeSchema),
  })

  async function addNewCake(data: AddCakeFormData) {
    const { quantity } = data

    try {
      await addCakes({
        cakeId,
        quantity: Number(quantity),
      })

      toast.success('Bolo adicionado com sucesso!')
    } catch (err) {
      console.error(err)
      toast.error('Houve um erro ao adicionar um novo bolo.')
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="sm"
            className="flex items-center gap-2 bg-violet-500 hover:bg-violet-600 w-full"
          >
            Adicionar <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Adicionar mais um bolo de {flavor} com {filling}{' '}
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(addNewCake)}
            className="flex flex-col gap-2 mt-4"
          >
            <Label className="mb-2">Alterar quantidade</Label>
            <Input
              placeholder="Digite a quantidade desejada"
              {...register('quantity')}
            />

            {errors.quantity && (
              <span className="text-sm text-red-400">
                {errors.quantity.message}
              </span>
            )}

            <Separator className="my-6" />

            <Button type="submit" className="bg-violet-500 hover:bg-violet-600">
              Adicionar
            </Button>
            <Button variant="ghost">Cancelar</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
