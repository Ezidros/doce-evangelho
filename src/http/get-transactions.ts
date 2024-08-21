import { api } from './api-client'

export interface GetTransactionsResponse {
  transactions: {
    id: string
    name: string
    description: string | null
    amount: number
    expense: boolean
    createdAt: Date
    updatedAt: Date
  }[]
}

export async function getTransactions() {
  const result = await api.get<GetTransactionsResponse>('/fetch/transactions')

  return result.data
}
