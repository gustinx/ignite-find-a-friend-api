import { PetAdoptionRequirementsRepository } from '@/repositories/pet-adoption-requirements-repository'
import { Requeriment } from '@prisma/client'

interface FetchRequirementsByPetUseCaseRequest {
  petId: string
}

interface FetchRequirementsByPetUseCaseResponse {
  requeriments: Requeriment[]
}

export class FetchRequirementsByPetUseCase {
  constructor(
    private petAdoptionRequeriments: PetAdoptionRequirementsRepository,
  ) {}

  async execute({
    petId,
  }: FetchRequirementsByPetUseCaseRequest): Promise<FetchRequirementsByPetUseCaseResponse> {
    const requeriments = await this.petAdoptionRequeriments.findByPet(petId)

    return { requeriments }
  }
}
