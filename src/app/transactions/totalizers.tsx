'use client'

import { getOrders } from '@/http/get-orders'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

interface TotalizersProps {
  searchParams: { page?: string }
}

interface Orders {
  id: string
  amount: number
  benefit: number
  revenue: number
  createdAt: string
  updatedAt: string
  cakeId: string
}

export function Totalizers({ searchParams }: TotalizersProps) {
  const currentPage = parseInt(searchParams.page || '1', 8)
  const [totalizers, setTotalizers] = useState({
    totalAmount: 0,
    totalBenefit: 0,
    totalRevenue: 0,
  })
  const totalPages = 3

  useEffect(() => {
    async function fetchOrdersAndCalculateTotals() {
      let allOrders: Orders[] = []
      let page = 1
      let hasMorePages = true

      while (hasMorePages) {
        const data = await getOrders(page, 8)
        allOrders = [...allOrders, ...data.orders]
        hasMorePages = data.orders.length > 0 && page < totalPages
        page++
      }

      const totals = allOrders.reduce(
        (totals, order) => {
          totals.totalAmount += order.amount
          totals.totalBenefit += order.benefit
          totals.totalRevenue += order.revenue
          return totals
        },
        { totalAmount: 0, totalBenefit: 0, totalRevenue: 0 },
      )

      setTotalizers(totals)
    }

    fetchOrdersAndCalculateTotals()
  }, [currentPage])

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="font-bold">Totalizadores</h2>
      <span className="text-zinc-400">
        {dayjs(new Date()).format('dddd, DD [de] MMMM [de] YYYY')}
      </span>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded border p-4 flex flex-col items-center gap-2">
          <h3>Valor total em vendas</h3>

          <span className="text-violet-400 font-bold">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(totalizers.totalAmount)}
          </span>
        </div>
        <div className="rounded border p-4 flex flex-col items-center">
          <h3>Valor total dos lucros</h3>

          <span className="text-green-400 font-bold">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(totalizers.totalBenefit)}
          </span>
        </div>
        <div className="rounded border p-4 flex flex-col items-center">
          <h3>Valor total para investimentos</h3>

          <span className="text-green-400 font-bold">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(totalizers.totalRevenue)}
          </span>
        </div>
      </div>
    </div>
  )
}
