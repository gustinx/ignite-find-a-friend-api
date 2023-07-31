import { InMemoryPetAdoptionRequeriments } from '@/repositories/in-memory/in-memory-pet-adoption-requirements'
import { CreatePetAdotionRequirementUseCase } from './create-pet-adoption-requirements'
import { beforeEach, describe, expect, it } from 'vitest'

let requirementsRepository: InMemoryPetAdoptionRequeriments
let sut: CreatePetAdotionRequirementUseCase

describe('Create adoption requirement use case', () => {
  beforeEach(() => {
    requirementsRepository = new InMemoryPetAdoptionRequeriments()
    sut = new CreatePetAdotionRequirementUseCase(requirementsRepository)
  })

  it('should be able to create a adoption requirement', async () => {
    const { requeriment } = await sut.execute({
      description: 'this is a example adoption requirement',
      petId: 'example pet id',
    })

    expect(requeriment.id).toEqual(expect.any(String))
  })
})
