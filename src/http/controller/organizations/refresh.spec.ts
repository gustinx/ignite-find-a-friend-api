import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Refresh token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh token', async () => {
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

    const authRes = await request(app.server).post('/sessions').send({
      email: 'testorganization@example.com',
      password: '123456',
    })

    const cookie = authRes.get('Set-Cookie')

    const response = await request(app.server)
      .get('/token/refresh')
      .set('Cookie', cookie)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
