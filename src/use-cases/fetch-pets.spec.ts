import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memry-pets-repository'
import { FetchPetsUseCase } from './fetch-pets'
import { beforeEach, describe, expect, it } from 'vitest'

let petsRepository: InMemoryPetsRepository
let sut: FetchPetsUseCase

describe('Fetch pet use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsUseCase(petsRepository)
  })

  it('should be able to fetch pets', async () => {
    await petsRepository.create({
      name: 'example pet 1',
      about: 'example about text',
      age: 'example age',
      size: 'example size 1',
      city: 'example city',
      energy: 'example energy',
      independence_level: 'example level',
      environment: 'example environment',
      organization_id: 'example organization',
    })

    await petsRepository.create({
      name: 'example pet 2',
      about: 'example about text',
      age: 'example age',
      size: 'example size',
      city: 'example city',
      energy: 'example energy',
      independence_level: 'example level',
      environment: 'example environment',
      organization_id: 'example organization',
    })

    await petsRepository.create({
      name: 'example pet 3',
      about: 'example about text',
      age: 'example age',
      size: 'example size',
      city: 'example city',
      energy: 'example energy',
      independence_level: 'example level',
      environment: 'example environment',
      organization_id: 'example organization',
    })

    const { pets } = await sut.execute({
      age: 'example age',
      size: 'example size',
    })

    expect(pets).toHaveLength(2)
  })
})
