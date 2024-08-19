'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { removeCake } from '@/http/remove-cake'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash } from 'lucide-react'
import { toast } from 'sonner'

interface RemoveCakesProps {
  cakeId: string
  flavor: string
  filling: string
}

export function RemoveCake({ cakeId, flavor, filling }: RemoveCakesProps) {
  const queryClient = useQueryClient()

  const { mutateAsync: removeFromDatabase } = useMutation({
    mutationFn: removeCake,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['cakes'], type: 'active' })
    },
  })

  async function removeCakeFn() {
    try {
      await removeFromDatabase({ cakeId })
      toast.success(`Bolo de ${flavor} com ${filling} removido com sucesso!`)
    } catch (err) {
      console.error(err)
      toast.error(
        'Houve um erro ao deletar o bolo, por favor tente novamente mais tarde.',
      )
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-red-400 hover:text-red-500 flex items-center gap-2"
        >
          Remover
          <Trash className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja remover o bolo {flavor} com {filling}
          </AlertDialogTitle>
          <AlertDialogDescription>
            A ação de remover um bolo da base de dados não poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-violet-500 hover:bg-violet-400"
            onClick={removeCakeFn}
          >
            Remover
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
