import { prisma } from '@/lib/prisma'
import request from 'supertest'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'

export async function createAndAuthenticateOrganization(app: FastifyInstance) {
  await prisma.organization.create({
    data: {
      name: 'Test Organization',
      email: 'testorganization@example.com',
      password_hash: await hash('123456', 6),
      address: 'example address',
      postal_code: '12345678',
      whatsapp: '996754567',
      city: 'example city',
      owner: 'John Doe',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'testorganization@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
