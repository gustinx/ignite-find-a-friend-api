import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FetchPetByCityUseCaseRequest {
  city: string
}

interface FetchPetByCityUseCaseResponse {
  pets: Pet[]
}

export class FetchPetByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
  }: FetchPetByCityUseCaseRequest): Promise<FetchPetByCityUseCaseResponse> {
    const pets = await this.petsRepository.findByCity(city)

    return { pets }
  }
}
