import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getCakes } from '@/http/get-cakes'
import { getOrders } from '@/http/get-orders'
import dayjs from 'dayjs'

import 'dayjs/locale/pt-br'

export default async function Orders() {
  const { orders } = await getOrders()
  const { cakes } = await getCakes()

  function findCakeById(cakeId: string) {
    const cake = cakes.find((item) => item.id === cakeId)

    return {
      flavor: cake?.flavor,
      filling: cake?.filling,
    }
  }

  function calculateBenefitAndRevenue(amount: string) {
    const amountNumber = parseFloat(amount.replace(',', '.'))

    const benefit = (amountNumber * 0.4).toFixed(2).replace('.', ',')

    const revenue = (amountNumber * 0.6).toFixed(2).replace('.', ',')

    return {
      benefit,
      revenue,
    }
  }

  return (
    <div className="flex flex-col items-center mt-32 gap-8">
      <h1 className="text-xl font-bold">Minhas vendas</h1>

      <div>
        <span className="text-zinc-400">
          Vendas totais em {dayjs(new Date()).format('MM/DD/YYYY')}:{' '}
        </span>
        <span className="font-bold">{orders.length}</span>
      </div>

      <div className="rounded border max-w-[1024px] w-full">
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
                    <TableCell>{order.amount}</TableCell>
                    <TableCell>
                      {calculateBenefitAndRevenue(order.amount).benefit}
                    </TableCell>
                    <TableCell>
                      {calculateBenefitAndRevenue(order.amount).revenue}
                    </TableCell>
                    <TableCell>
                      {findCakeById(order.cakeId).flavor} com{' '}
                      {findCakeById(order.cakeId).filling}
                    </TableCell>
                    <TableCell>
                      Vendido em:{' '}
                      <span className="font-bold">
                        {dayjs(order.createdAt).format('MMMM D, YYYY')}
                      </span>
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
