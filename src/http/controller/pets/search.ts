import { makeFetchByCityUseCase } from '@/use-cases/factories/make-fetch-pets-by-city'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchBodySchema = z.object({
    city: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { city, page } = searchBodySchema.parse(request.query)

  const makeFetchPetsByCity = makeFetchByCityUseCase()

  const { pets } = await makeFetchPetsByCity.execute({ city, page })

  return reply.status(200).send({ pets })
}
