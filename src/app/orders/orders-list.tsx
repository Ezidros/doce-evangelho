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
    price: string
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
  amount: string
  benefit: string
  revenue: string
  createdAt: string
  updatedAt: string
  cakeId: string
}

export function OrdersList({ cakes, searchParams }: OrdersListProps) {
  const currentPage = parseInt(searchParams.page || '1', 8)
  const totalPages = 3
  const [orders, setOrders] = useState<Orders[]>([])

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

  function calculateBenefitAndRevenue(amount: string) {
    const sanitizedAmount = amount.replace('R$', '').trim()

    const amountNumber = parseFloat(sanitizedAmount.replace(',', '.'))

    const benefit = (amountNumber * 0.4).toFixed(2).replace('.', ',')
    const revenue = (amountNumber * 0.6).toFixed(2).replace('.', ',')

    return {
      benefit,
      revenue,
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
                  <TableCell>R$ {order.amount}</TableCell>
                  <TableCell>
                    R$ {calculateBenefitAndRevenue(order.amount).benefit}
                  </TableCell>
                  <TableCell>
                    R$ {calculateBenefitAndRevenue(order.amount).revenue}
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
