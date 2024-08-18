'use client'

import { Button } from '@/components/ui/button'
import { removeCake } from '@/http/remove-cake'
import { Trash } from 'lucide-react'

export function RemoveCake({ cakeId }: { cakeId: string }) {
  async function removeCakeFn() {
    await removeCake({ cakeId })
  }

  return (
    <Button
      onClick={removeCakeFn}
      variant="ghost"
      className="text-red-400 hover:text-red-500 flex items-center gap-2"
    >
      Remover
      <Trash className="size-4" />
    </Button>
  )
}
