import { api } from './api-client'

interface createCakeRequest {
  cakeId: string
  flavor: string
  filling: string
  description: string
  price: string
  quantity: number | null
  isSpecialFlavor: boolean | null
  isSolded: boolean | null
}

export async function updateCake({
  cakeId,
  flavor,
  filling,
  description,
  price,
  quantity,
  isSolded,
  isSpecialFlavor,
}: createCakeRequest): Promise<void> {
  await api.put(`/update/cake/${cakeId}`, {
    flavor,
    filling,
    description,
    price,
    quantity: quantity ?? 0,
    isSolded: isSolded ?? false,
    isSpecialFlavor: isSpecialFlavor ?? false,
  })
}
