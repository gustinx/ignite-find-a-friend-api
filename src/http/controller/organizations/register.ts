import { OrganizationAlreadyExistsError } from '@/use-cases/errors/organization-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    owner: z.string(),
    email: z.string().email(),
    password: z.string(),
    address: z.string(),
    postal_code: z.string(),
    city: z.string(),
    whatsapp: z.string(),
  })

  const { name, owner, email, password, address, postal_code, city, whatsapp } =
    registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      name,
      owner,
      email,
      password,
      address,
      postal_code,
      city,
      whatsapp,
    })
  } catch (err) {
    if (err instanceof OrganizationAlreadyExistsError)
      return reply.status(400).send({ message: err.message })

    throw err
  }

  return reply.status(201).send()
}
