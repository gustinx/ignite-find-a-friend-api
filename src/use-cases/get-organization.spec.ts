import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { GetOrganizationUseCase } from './get-organization'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let organizationRepository: InMemoryOrganizationsRepository
let sut: GetOrganizationUseCase

describe('Get organization use case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationsRepository()
    sut = new GetOrganizationUseCase(organizationRepository)
  })

  it('should be able to get a organization', async () => {
    const createdOrg = await organizationRepository.create({
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
      organizationId: createdOrg.id,
    })

    expect(organization.name).toEqual('Test Organization')
  })

  it('should not be able to get a organization with wrong id', async () => {
    await expect(() =>
      sut.execute({ organizationId: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
