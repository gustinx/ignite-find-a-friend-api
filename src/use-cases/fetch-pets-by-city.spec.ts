import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memry-pets-repository'
import { FetchPetByCityUseCase } from './fetch-pets-by-city'
import { beforeEach, describe, expect, it } from 'vitest'

let petsRepository: InMemoryPetsRepository
let sut: FetchPetByCityUseCase

describe('Fetch pet by city use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetByCityUseCase(petsRepository)
  })

  it('should be able to fetch a pet by it city', async () => {
    await petsRepository.create({
      name: 'example pet 1',
      about: 'example about text',
      age: 'example age',
      size: 'example size',
      city: 'example city 1',
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
      city: 'example city 1',
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

    const { pets } = await sut.execute({ city: 'example city 1' })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'example pet 1' }),
      expect.objectContaining({ name: 'example pet 2' }),
    ])
  })
})
