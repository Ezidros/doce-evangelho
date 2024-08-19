import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getCakes } from '@/http/get-cakes'
import { Edit } from 'lucide-react'
import { AddCake } from './add-cake'
import { RemoveCake } from './remove-cake'
import { MarkCakeAsSold } from './mark-cake-as-sold'

export default async function Home() {
  const { cakes } = await getCakes()

  return (
    <main className="flex flex-col items-center mt-24">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold my-8">Bolos cadastrados</h1>

        <div className="grid grid-cols-3 gap-4">
          {cakes.map((cake) => {
            return (
              <Card key={cake.id}>
                <CardHeader>
                  <CardTitle>
                    {cake.flavor} com {cake.filling}
                  </CardTitle>
                  <CardDescription>{cake.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        className="text-violet-400 hover:text-violet-500 flex items-center gap-2"
                      >
                        Editar
                        <Edit className="size-4" />
                      </Button>

                      <RemoveCake cakeId={cake.id} />
                    </div>

                    <Separator className="my-4" />

                    <h2 className="text-lg font-bold">Informações</h2>

                    <span>Preço: R$ {cake.price}</span>
                    <span>Quantidade disponivel: {cake.quantity}</span>

                    <Separator className="my-4" />

                    <AddCake
                      cakeId={cake.id}
                      flavor={cake.flavor}
                      filling={cake.filling}
                    />

                    <MarkCakeAsSold cakeId={cake.id} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </main>
  )
}
