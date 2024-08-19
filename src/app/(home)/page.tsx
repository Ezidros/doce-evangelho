import { CakesCards } from './cakes-cards'

export default async function Home() {
  return (
    <main className="flex flex-col items-center mt-24">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold my-8">Bolos cadastrados</h1>

        <CakesCards />
      </div>
    </main>
  )
}
