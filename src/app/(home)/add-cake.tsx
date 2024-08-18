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

interface AddCakeProps {
  cakeId: string
  quantity: number | null
  flavor: string
  filling: string
}

export function AddCake({ cakeId, quantity, flavor, filling }: AddCakeProps) {
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

          <form className="flex flex-col gap-2 mt-4">
            <Label className="mb-2">Alterar quantidade</Label>
            <Input placeholder="Digite a quantidade desejada" name="quantity" />

            <Separator className="my-6" />

            <Button
              onClick={async () => await addCakes({ cakeId, quantity })}
              className="bg-violet-500 hover:bg-violet-600"
            >
              Adicionar
            </Button>
            <Button variant="ghost">Cancelar</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
