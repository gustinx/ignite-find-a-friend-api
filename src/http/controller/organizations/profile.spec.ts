import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Profile (e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get organization profile', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    const response = await request(app.server)
      .patch('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.organization).toEqual(
      expect.objectContaining({ email: 'testorganization@example.com' }),
    )
  })
})
