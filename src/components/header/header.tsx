'use client'

import { Button } from '../ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'
import { Separator } from '../ui/separator'
import { useRouter } from 'next/navigation'
import { FormCreateCake } from '@/app/(home)/form-create-cake'

export function Header() {
  const router = useRouter()

  return (
    <div className="w-full p-8 bg-zinc-900 fixed">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">Doce Evangelho</h1>
        </div>

        <div>
          <Button
            onClick={() => router.push('/orders')}
            className="hover:text-violet-400"
            variant="link"
          >
            Minhas vendas
          </Button>

          <Button
            onClick={() => router.push('/')}
            className="mr-8 hover:text-violet-400"
            variant="link"
          >
            Inicio
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button className="bg-violet-500 hover:bg-violet-600">
                Adicionar novo sabor
              </Button>
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>
                <SheetTitle>Cadastrar novo bolo</SheetTitle>
                <SheetDescription>
                  Ao cadastar um novo sabor você o mesmo será exibido na
                  listagem de bolos da página inicial
                </SheetDescription>
              </SheetHeader>

              <Separator className="my-8" />

              <FormCreateCake />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}
