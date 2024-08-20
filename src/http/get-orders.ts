import { api } from './api-client'

export interface GetOrdersResponse {
  orders: {
    id: string
    amount: number
    benefit: number
    revenue: number
    createdAt: string
    updatedAt: string
    cakeId: string
  }[]
}

export async function getOrders(page: number = 1, limit: number = 10) {
  const result = await api.get<GetOrdersResponse>('/fetch/orders', {
    params: {
      page,
      limit,
    },
  })

  return result.data
}
