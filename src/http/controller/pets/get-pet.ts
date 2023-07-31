import { MakeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const petParamsSchema = z.object({
    petId: z.string(),
  })

  const { petId } = petParamsSchema.parse(request.params)

  const getPetUseCase = MakeGetPetUseCase()

  const { pet } = await getPetUseCase.execute({ petId })

  return reply.status(200).send({ pet })
}
