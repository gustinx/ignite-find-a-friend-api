import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUserCase } from './register'
import { compare } from 'bcryptjs'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

let organizationRepository: InMemoryOrganizationsRepository
let sut: RegisterUserCase

describe('Register UseCase', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterUserCase(organizationRepository)
  })

  it('should be able to register a organization', async () => {
    const { organization } = await sut.execute({
      name: 'Test Organization',
      email: 'testorganization@example.com',
      password: '123456',
      address: 'example address',
      postal_code: '12345678',
      whatsapp: '996754567',
      city: 'example city',
      owner: 'John Doe',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { organization } = await sut.execute({
      name: 'Test Organization',
      email: 'testorganization@example.com',
      password: '123456',
      address: 'example address',
      postal_code: '12345678',
      whatsapp: '996754567',
      city: 'example city',
      owner: 'John Doe',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      organization.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register using an already registered email', async () => {
    await sut.execute({
      name: 'Test Organization',
      email: 'testorganization@example.com',
      password: '123456',
      address: 'example address',
      postal_code: '12345678',
      whatsapp: '996754567',
      city: 'example city',
      owner: 'John Doe',
    })

    await expect(() =>
      sut.execute({
        name: 'Test Organization',
        email: 'testorganization@example.com',
        password: '123456',
        address: 'example address',
        postal_code: '12345678',
        whatsapp: '996754567',
        city: 'example city',
        owner: 'John Doe',
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })
})
