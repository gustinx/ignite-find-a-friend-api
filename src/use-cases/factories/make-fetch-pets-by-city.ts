import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetByCityUseCase } from '../fetch-pets-by-city'

export function makeFetchByCityUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new FetchPetByCityUseCase(petsRepository)

  return useCase
}
