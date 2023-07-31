import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memry-pets-repository'
import { GetPetUseCase } from './get-pet'
import { describe, expect, it, beforeEach } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: GetPetUseCase

describe('Get pets use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetUseCase(petsRepository)
  })

  it('should be able to get a pet', async () => {
    const createdPet = await petsRepository.create({
      name: 'example pet',
      about: 'example about text',
      age: 'example age',
      size: 'example size',
      city: 'example city',
      energy: 'example energy',
      independence_level: 'example level',
      environment: 'example environment',
      organization_id: 'example organization',
    })

    const { pet } = await sut.execute({
      petId: createdPet.id,
    })

    expect(pet.name).toEqual('example pet')
  })

  it('should not be able to get a pet with wrong id', async () => {
    await expect(() =>
      sut.execute({ petId: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
