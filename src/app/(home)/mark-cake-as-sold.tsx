'use client'

import { Button } from '@/components/ui/button'
import { markCakeAsSold } from '@/http/mark-cake-as-sold'
import { MinusCircle } from 'lucide-react'
import { toast } from 'sonner'

export function MarkCakeAsSold({ cakeId }: { cakeId: string }) {
  async function SoldCake() {
    await markCakeAsSold(cakeId)
      .then(() => toast.success('Parabens por mais uma venda!'))
      .catch((err) => console.error(err))
  }

  return (
    <Button
      onClick={SoldCake}
      size="sm"
      variant="outline"
      className="mt-2 flex items-center gap-2"
    >
      Marcar como vendido
      <MinusCircle />
    </Button>
  )
}
