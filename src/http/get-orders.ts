import { api } from './api-client'

interface GetOrdersResponse {
  orders: {
    id: string
    amount: string
    benefit: string
    revenue: string
    createdAt: string
    updatedAt: string
    cakeId: string
  }[]
}

export async function getOrders() {
  const result = await api.get<GetOrdersResponse>('/fetch/orders')

  return result.data
}
