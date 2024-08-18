import { api } from './api-client'

interface GetCakesResponse {
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

export async function getCakes() {
  const result = await api.get<GetCakesResponse>('/fetch/cakes')

  return result.data
}
