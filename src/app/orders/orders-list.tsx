'use client'

import { Pagination } from '@/components/pagination/pagination'
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
  const totalPages = 3

  useEffect(() => {
    async function fetchOrders() {
      const data = await getOrders(currentPage, 8)
      setOrders(data.orders)
    }

    fetchOrders()
  }, [currentPage])

  function findCakeById(cakeId: string) {
    const cake = cakes.find((item) => item.id === cakeId)

    return {
      flavor: cake?.flavor,
      filling: cake?.filling,
    }
  }

  return (
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
  )
}
