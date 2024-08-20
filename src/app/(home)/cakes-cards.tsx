'use client'

import { getCakes } from '@/http/get-cakes'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { AddCake } from './add-cake'
import { RemoveCake } from './remove-cake'
import { MarkCakeAsSold } from './mark-cake-as-sold'
import { useQuery } from '@tanstack/react-query'
import { ButtonRedirectToUpdateCake } from './button-redirect-to-update'

interface CakesCardResponse {
  cakes: {
    id: string
    flavor: string
    filling: string
    description: string
    quantity: number
    price: string
    isSpecialFlavor: boolean | null
    isSolded: boolean | null
    createdAt: string
    updatedAt: string
  }[]
}

export function CakesCards() {
  const { data: cakes, isLoading: isLoadingCakes } =
    useQuery<CakesCardResponse>({
      queryKey: ['cakes'],
      queryFn: getCakes,
    })

  return (
    <div className="grid grid-cols-3 gap-4">
      <>
        {isLoadingCakes ? (
          <div className="flex flex-col justify-center absolute right-1/2 left-1/2 items-center mt-32 gap-6">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-violet-700 border-solid" />
          </div>
        ) : (
          <>
            {cakes?.cakes.map((cake) => {
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
                        <ButtonRedirectToUpdateCake cakeId={cake.id} />

                        <RemoveCake
                          cakeId={cake.id}
                          flavor={cake.flavor}
                          filling={cake.filling}
                        />
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
          </>
        )}
      </>
    </div>
  )
}
