import { PrismaPetAdoptionRequirements } from '@/repositories/prisma/prisma-pet-adoption-requirements'
import { CreatePetAdotionRequirementUseCase } from '../create-pet-adoption-requirements'

export function makeCreatePetAdoptionUseCase() {
  const petAdoptionRequeriment = new PrismaPetAdoptionRequirements()
  const useCase = new CreatePetAdotionRequirementUseCase(petAdoptionRequeriment)

  return useCase
}
