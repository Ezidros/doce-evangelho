import { api } from './api-client'

interface AddCakesRequest {
  cakeId: string
  quantity: number | null
}

export async function addCakes({ cakeId, quantity }: AddCakesRequest) {
  await api.put(`/add/cake/${cakeId}`, {
    quantity,
  })
}
