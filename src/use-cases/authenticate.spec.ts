import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { AuthenticateUseCase } from './authenticate'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentias-error'

let organizationRepository: InMemoryOrganizationsRepository
let sut: AuthenticateUseCase

describe('Authenticate use case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateUseCase(organizationRepository)
  })

  it('should be able to authenticate', async () => {
    await organizationRepository.create({
      name: 'Test Organization',
      email: 'testorganization@example.com',
      password_hash: await hash('123456', 6),
      address: 'example address',
      postal_code: '12345678',
      whatsapp: '996754567',
      city: 'example city',
      owner: 'John Doe',
    })

    const { organization } = await sut.execute({
      email: 'testorganization@example.com',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await organizationRepository.create({
      name: 'Test Organization',
      email: 'testorganization@example.com',
      password_hash: await hash('123456', 6),
      address: 'example address',
      postal_code: '12345678',
      whatsapp: '996754567',
      city: 'example city',
      owner: 'John Doe',
    })

    await expect(() =>
      sut.execute({
        email: 'wrongemail@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await organizationRepository.create({
      name: 'Test Organization',
      email: 'testorganization@example.com',
      password_hash: await hash('123456', 6),
      address: 'example address',
      postal_code: '12345678',
      whatsapp: '996754567',
      city: 'example city',
      owner: 'John Doe',
    })

    await expect(() =>
      sut.execute({
        email: 'testorganization@example.com',
        password: 'wrongpassword',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
