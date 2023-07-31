import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/organizations').send({
      name: 'Test Organization',
      email: 'testorganization@example.com',
      password: '123456',
      address: 'example address',
      postal_code: '12345678',
      whatsapp: '996754567',
      city: 'example city',
      owner: 'John Doe',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'testorganization@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({ token: expect.any(String) })
  })
})
