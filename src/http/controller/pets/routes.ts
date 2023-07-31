import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { filter } from './filter'
import { getPet } from './get-pet'
import { search } from './search'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/pets', create)
  app.get('/peets', filter)
  app.get('/pet/:petId', getPet)
  app.get('/pets/search', search)
}
