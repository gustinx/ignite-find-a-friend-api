import { InMemoryPetAdoptionRequeriments } from '@/repositories/in-memory/in-memory-pet-adoption-requirements'
import { FetchRequirementsByPetUseCase } from './fetch-requirements-by-pet'
import { beforeEach, describe, expect, it } from 'vitest'

let requirementsRepository: InMemoryPetAdoptionRequeriments
let sut: FetchRequirementsByPetUseCase

describe('should be able to get a pet adoption requiremnts', () => {
  beforeEach(() => {
    requirementsRepository = new InMemoryPetAdoptionRequeriments()
    sut = new FetchRequirementsByPetUseCase(requirementsRepository)
  })

  it('should be able to fetch adoption requeriments of a pet', async () => {
    await requirementsRepository.create({
      petId: 'example pet',
      description: 'example description 1',
    })

    await requirementsRepository.create({
      petId: 'example pet',
      description: 'example description 2',
    })

    const { requeriments } = await sut.execute({
      petId: 'example pet',
    })

    expect(requeriments).toHaveLength(2)
    expect(requeriments).toEqual([
      expect.objectContaining({ description: 'example description 1' }),
      expect.objectContaining({ description: 'example description 2' }),
    ])
  })
})
