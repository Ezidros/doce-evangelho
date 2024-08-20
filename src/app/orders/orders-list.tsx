'use client'

import { Pagination } from '@/components/pagination/pagination'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getOrders } from '@/http/get-orders'

import dayjs from 'dayjs'

import 'dayjs/locale/pt-br'
import { useEffect, useState } from 'react'

dayjs.locale('pt-br')

interface OrdersListProps {
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
  searchParams: {
    page?: string
  }
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

export function OrdersList({ cakes, searchParams }: OrdersListProps) {
  const currentPage = parseInt(searchParams.page || '1', 8)
  const [orders, setOrders] = useState<Orders[]>([])
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

      setOrders(allOrders)

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

  function findCakeById(cakeId: string) {
    const cake = cakes.find((item) => item.id === cakeId)

    return {
      flavor: cake?.flavor,
      filling: cake?.filling,
    }
  }

  return (
    <>
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

      <Separator className="max-w-[1024px] w-full my-4" />

      <div className="rounded border max-w-[1024px] w-full mb-10 p-4">
        <Table>
          <TableCaption className="mb-4">
            Uma lista de todas as vendas realizadas
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Valor da venda</TableHead>
              <TableHead>Lucro</TableHead>
              <TableHead>Investimento</TableHead>
              <TableHead>Bolo</TableHead>
              <TableHead>Data da venda</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders &&
              orders.map((order) => {
                return (
                  <TableRow key={order.id}>
                    <TableCell>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(order.amount)}
                    </TableCell>
                    <TableCell>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(order.benefit)}
                    </TableCell>
                    <TableCell>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(order.revenue)}
                    </TableCell>
                    <TableCell>
                      {findCakeById(order.cakeId).flavor} com{' '}
                      {findCakeById(order.cakeId).filling}
                    </TableCell>
                    <TableCell>
                      Vendido em:{' '}
                      <span className="font-bold">
                        {dayjs(order.createdAt).format('DD/MM/YYYY')}
                      </span>
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          orders={orders}
          basePath="/orders"
        />
      </div>
    </>
  )
}
