import { api } from './api-client'

interface createCakeRequest {
  flavor: string
  filling: string
  description: string
  price: number
  quantity: number | null
  isSpecialFlavor: boolean | null
  isSolded: boolean | null
}

export async function createCake({
  flavor,
  filling,
  description,
  price,
  quantity,
  isSolded,
  isSpecialFlavor,
}: createCakeRequest): Promise<void> {
  await api.post('/create/cake', {
    flavor,
    filling,
    description,
    price,
    quantity: quantity ?? 0,
    isSolded: isSolded ?? false,
    isSpecialFlavor: isSpecialFlavor ?? false,
  })
}
