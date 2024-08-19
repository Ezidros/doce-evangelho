'use client'

import { getCakes } from '@/http/get-cakes'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Edit } from 'lucide-react'
import { AddCake } from './add-cake'
import { RemoveCake } from './remove-cake'
import { MarkCakeAsSold } from './mark-cake-as-sold'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'

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
  const [progress, setProgress] = useState(13)

  const { data: cakes, isLoading: isLoadingCakes } =
    useQuery<CakesCardResponse>({
      queryKey: ['cakes'],
      queryFn: getCakes,
    })

  useEffect(() => {
    if (!isLoadingCakes) return

    const steps = [13, 66, 100]
    let currentStepIndex = 0

    const timer = setInterval(() => {
      setProgress(steps[currentStepIndex])
      currentStepIndex = (currentStepIndex + 1) % steps.length
    }, 500)

    return () => clearInterval(timer)
  }, [isLoadingCakes])

  useEffect(() => {
    const completeLoadingTimer = setTimeout(() => {
      setProgress(100)
    }, 10000)

    return () => clearTimeout(completeLoadingTimer)
  }, [])

  return (
    <div className="grid grid-cols-3 gap-4">
      <>
        {isLoadingCakes ? (
          <Progress value={progress} className="w-[60%]" />
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
                        <Button
                          variant="ghost"
                          className="text-violet-400 hover:text-violet-500 flex items-center gap-2"
                        >
                          Editar
                          <Edit className="size-4" />
                        </Button>

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
