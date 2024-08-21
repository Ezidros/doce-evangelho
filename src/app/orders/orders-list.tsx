'use client'

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
import { useQuery } from '@tanstack/react-query'

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
}

export function OrdersList({ cakes }: OrdersListProps) {
  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: () => getOrders(),
  })

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
            orders.orders.map((order) => {
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
    </div>
  )
}
