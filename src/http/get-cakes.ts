import { api } from './api-client'

export interface GetCakesResponse {
  cakes: {
    id: string
    flavor: string
    filling: string
    description: string
    quantity: number
    price: number
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
