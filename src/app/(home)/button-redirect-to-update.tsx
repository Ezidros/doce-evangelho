'use client'

import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ButtonRedirectToUpdateProps {
  cakeId: string
}

export function ButtonRedirectToUpdateCake({
  cakeId,
}: ButtonRedirectToUpdateProps) {
  const router = useRouter()

  return (
    <Button
      onClick={() => router.push(`/update/cake/${cakeId}`)}
      variant="ghost"
      className="text-violet-400 hover:text-violet-500 flex items-center gap-2"
    >
      Editar
      <Edit className="size-4" />
    </Button>
  )
}
