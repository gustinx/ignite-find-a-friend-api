import { makeCreatePetAdoptionUseCase } from '@/use-cases/factories/make-create-pet-adoption-use-case'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createAdoptionRequerimentBodySchema = z.object({
    description: z.string(),
  })
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    city: z.string(),
    age: z.string(),
    size: z.string(),
    energy: z.string(),
    independence_level: z.string(),
    environment: z.string(),
    adoption_requeriments: z.array(createAdoptionRequerimentBodySchema),
  })

  const {
    name,
    about,
    age,
    size,
    energy,
    environment,
    independence_level,
    city,
    adoption_requeriments,
  } = createPetBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  const { pet } = await createPetUseCase.execute({
    name,
    about,
    age,
    size,
    energy,
    environment,
    independence_level,
    city,
    organization_id: request.user.sub,
  })

  const createAdoptionRequerimentUseCase = makeCreatePetAdoptionUseCase()

  for await (const adoptionRequeriment of adoption_requeriments) {
    await createAdoptionRequerimentUseCase.execute({
      petId: pet.id,
      description: adoptionRequeriment.description,
    })
  }

  return reply.status(201).send()
}
