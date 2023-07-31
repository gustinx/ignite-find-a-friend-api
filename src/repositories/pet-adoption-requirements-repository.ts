import { Prisma, Requeriment } from '@prisma/client'

export interface PetAdoptionRequirementsRepository {
  create(data: Prisma.RequerimentUncheckedCreateInput): Promise<Requeriment>
  findByPet(petId: string): Promise<Requeriment[]>
}
