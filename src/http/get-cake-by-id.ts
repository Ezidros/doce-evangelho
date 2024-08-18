import { api } from './api-client'

interface GetCakeResponse {
  cake: {
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
  }
}

export async function getCakeById(cakeId: string) {
  const result = await api.get<GetCakeResponse>(`/fetch/cake/${cakeId}`)

  return result.data
}
