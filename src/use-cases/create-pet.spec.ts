import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memry-pets-repository'
import { CreatePetUseCase } from './create-pet'
import { beforeEach, describe, expect, it } from 'vitest'

let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create pet use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to create a pet', async () => {
    const { pet } = await sut.execute({
      name: 'example pet 1',
      about: 'example about text',
      age: 'example age',
      size: 'example size',
      city: 'example city',
      energy: 'example energy',
      independence_level: 'example level',
      environment: 'example environment',
      organization_id: 'example organization',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
