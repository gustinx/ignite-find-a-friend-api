import { PetAdoptionRequirementsRepository } from '@/repositories/pet-adoption-requirements-repository'
import { Requeriment } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreatePetAdotionRequirementUseCaseRequest {
  description: string
  petId: string
}

interface CreatePetAdotionRequirementUseCaseResponse {
  requeriment: Requeriment
}

export class CreatePetAdotionRequirementUseCase {
  constructor(
    private petAdoptionRequeriment: PetAdoptionRequirementsRepository,
  ) {}

  async execute({
    description,
    petId,
  }: CreatePetAdotionRequirementUseCaseRequest): Promise<CreatePetAdotionRequirementUseCaseResponse> {
    const requeriment = await this.petAdoptionRequeriment.create({
      description,
      petId,
    })

    if (!requeriment) {
      throw new ResourceNotFoundError()
    }

    return { requeriment }
  }
}
