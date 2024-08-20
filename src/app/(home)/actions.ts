'use server'

import { addCakes } from '@/http/add-new-cake-count'
import { createCake } from '@/http/create-cake'
import { removeCake } from '@/http/remove-cake'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const cakeSchema = z.object({
  flavor: z.string().min(1, { message: 'Campo obrigatório' }),
  filling: z.string().min(1, { message: 'Campo obrigatório' }),
  price: z.coerce.number().min(1, { message: 'Campo obrigatório' }),
  quantity: z.number().nullable(),
  isSolded: z.boolean().optional().default(false),
  isSpecialFlavor: z.boolean().optional().default(false),
  description: z.string().min(5, { message: 'Digite pelo meos 5 caracteres' }),
})

export async function createCakeAction(data: FormData) {
  const result = cakeSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const {
    flavor,
    filling,
    price,
    quantity,
    isSolded,
    isSpecialFlavor,
    description,
  } = result.data

  try {
    await createCake({
      flavor,
      description,
      filling,
      price,
      quantity: quantity ?? 0,
      isSolded: isSolded ?? false,
      isSpecialFlavor: isSpecialFlavor ?? false,
    })

    revalidateTag('cakes')
  } catch (err) {
    if (err instanceof HTTPError) {
      const error: { message: string } = await err.response.json()

      return { success: false, message: error.message, errors: null }
    }

    console.error(err)

    return {
      success: false,
      message:
        'Houve um erro ao cadastrar o bolo. Por favor tente novamente mais tarde.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Bolo criado com sucesso',
    errors: null,
  }
}

export async function addCakesAction(cakeId: string, quantity: number | null) {
  await addCakes({
    cakeId,
    quantity,
  })
}

export async function removeCakeAction(cakeId: string) {
  await removeCake({ cakeId })
}
