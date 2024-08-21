'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getTransactions } from '@/http/get-transactions'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, ArrowRight, Edit, Trash } from 'lucide-react'

import dayjs from 'dayjs'

import 'dayjs/locale/pt-br'
import { Button } from '@/components/ui/button'

dayjs.locale('pt-br')

interface GetTransactionsResponse {
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

export function TransactionsList() {
  const { data: transactions } = useQuery<GetTransactionsResponse>({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  })

  return (
    <div className="rounded border max-w-[1024px] w-full mb-10 p-4">
      <>
        {transactions?.transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <span className="text-zinc-200 font-semibold">
              Voce ainda nao tem compras cadastradas.
            </span>

            <Button className="bg-violet-500 hover:bg-violet-600">
              Cadastrar agora
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Despesa</TableHead>
                <TableHead>Valor da compra</TableHead>
                <TableHead>Nome do produto</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Data da compra</TableHead>
                <TableHead>Editar</TableHead>
                <TableHead>Remover</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {transactions &&
                transactions.transactions.map((transaction) => {
                  return (
                    <TableRow key={transaction.id}>
                      <TableCell
                        data-expense={transaction.expense}
                        className="flex items-center gap-2 data-[expense=true]:text-green-400 data-[expense=false]:text-red-500"
                      >
                        {transaction.expense ? 'Entrada' : 'Saida'}{' '}
                        {transaction.expense ? (
                          <ArrowRight className="size-4" />
                        ) : (
                          <ArrowLeft className="size-4" />
                        )}
                      </TableCell>
                      <TableCell>
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(transaction.amount)}
                      </TableCell>
                      <TableCell>{transaction.name}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>
                        <span className="font-bold">
                          {dayjs(transaction.createdAt).format(
                            'dddd[,] DD [de] MMMM [de] YYYY',
                          )}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button className="text-zinc-400" variant="ghost">
                          <Edit className="size-5" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          className="text-red-500 hover:text-red-600"
                          variant="ghost"
                        >
                          <Trash className="size-5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        )}
      </>
    </div>
  )
}
