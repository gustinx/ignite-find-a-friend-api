import { makeFetchPetUseCase } from '@/use-cases/factories/make-fetch-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function filter(request: FastifyRequest, reply: FastifyReply) {
  const filterParamsSchema = z.object({
    age: z.string().optional(),
    size: z.string().optional(),
    energy: z.string().optional(),
    independence_level: z.string().optional(),
    page: z.coerce.number().min(1).default(1),
  })

  const query = filterParamsSchema.parse(request.query)

  const fetchPetsUseCase = makeFetchPetUseCase()

  const { pets } = await fetchPetsUseCase.execute(query)

  return reply.status(200).send({ pets })
}
