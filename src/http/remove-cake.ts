import { api } from './api-client'

interface AddCakesRequest {
  cakeId: string
}

export async function removeCake({ cakeId }: AddCakesRequest) {
  await api.delete(`/delete/cake/${cakeId}`)
}
