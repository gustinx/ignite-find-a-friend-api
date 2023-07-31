import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { refresh } from './refresh'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { profile } from './profile'

export async function organizationRoutes(app: FastifyInstance) {
  app.post('/organizations', register)
  app.post('/sessions', authenticate)
  app.get('/token/refresh', refresh)

  app.patch('/me', { onRequest: [verifyJwt] }, profile)
}
