import { getCakes } from '@/http/get-cakes'
import { OrdersList } from './orders-list'

export default async function Orders() {
  const { cakes } = await getCakes()

  return (
    <div className="flex flex-col items-center mt-32 gap-8">
      <h1 className="text-xl font-bold">Minhas vendas</h1>

      <OrdersList cakes={cakes} />
    </div>
  )
}
