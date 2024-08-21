import { Separator } from '@/components/ui/separator'
import { Totalizers } from './totalizers'
import { TransactionsList } from './transactions-list'

interface TransactionsPageProps {
  searchParams: { page?: string }
}

export default function Transactions({ searchParams }: TransactionsPageProps) {
  return (
    <div className="flex flex-col items-center mt-32 gap-8">
      <h1 className="text-xl font-bold">Minhas Compras</h1>

      <Totalizers searchParams={searchParams} />

      <Separator className="my-6 max-w-[1024px] w-full" />

      <TransactionsList />
    </div>
  )
}
