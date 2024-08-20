import { getCakeById } from '@/http/get-cake-by-id'
import { FormUpdateCake } from './form-update-cake'

interface UpdateCakeParams {
  params: {
    id: string
  }
}

export default async function UpdateCake({ params }: UpdateCakeParams) {
  const cakeId = params.id

  const { cake } = await getCakeById(cakeId)

  return (
    <main className="flex flex-col items-center mt-24">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold my-8">
          Atualizar o bolo de {cake.flavor} com {cake.filling}
        </h1>

        <FormUpdateCake cake={cake} />
      </div>
    </main>
  )
}
