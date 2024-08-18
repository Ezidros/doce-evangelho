import { api } from './api-client'

export async function markCakeAsSold(cakeId: string) {
  await api.post(`sold/order/${cakeId}`)
}
