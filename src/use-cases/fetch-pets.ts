import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FetchPetsUseCaseRequest {
  age?: string
  size?: string
  energy?: string
  independence_level?: string
}

interface FetchPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    query: FetchPetsUseCaseRequest,
  ): Promise<FetchPetsUseCaseResponse> {
    const pets = await this.petsRepository.filter(query)

    return { pets }
  }
}
