import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface CreatePetUseCaseRequest {
  name: string
  about: string
  age: string
  city: string
  size: string
  energy: string
  independence_level: string
  environment: string
  organization_id: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    about,
    city,
    age,
    energy,
    environment,
    independence_level,
    size,
    organization_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      about,
      city,
      age,
      energy,
      environment,
      independence_level,
      size,
      organization_id,
    })

    return {
      pet,
    }
  }
}
