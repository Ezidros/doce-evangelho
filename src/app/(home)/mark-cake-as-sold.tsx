'use client'

import { Button } from '@/components/ui/button'
import { markCakeAsSold } from '@/http/mark-cake-as-sold'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MinusCircle } from 'lucide-react'
import { toast } from 'sonner'

interface MarkAsSoldProps {
  cakeId: string
}

export function MarkCakeAsSold({ cakeId }: MarkAsSoldProps) {
  const queryClient = useQueryClient()

  const { mutateAsync: markCakeAsSoldFn } = useMutation({
    mutationFn: markCakeAsSold,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['cakes'], type: 'active' })
    },
  })

  async function soldCake() {
    await markCakeAsSoldFn(cakeId)
      .then(() => toast.success('Parabens por mais uma venda!'))
      .catch((err) => console.error(err))
  }

  return (
    <Button
      onClick={soldCake}
      size="sm"
      variant="outline"
      className="mt-2 flex items-center gap-2"
    >
      Marcar como vendido
      <MinusCircle />
    </Button>
  )
}
