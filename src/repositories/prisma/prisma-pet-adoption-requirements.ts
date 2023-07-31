import { Prisma } from '@prisma/client'
import { PetAdoptionRequirementsRepository } from '../pet-adoption-requirements-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetAdoptionRequirements
  implements PetAdoptionRequirementsRepository
{
  async create(data: Prisma.RequerimentUncheckedCreateInput) {
    const requeriment = await prisma.requeriment.create({
      data: {
        description: data.description,
        petId: data.petId,
      },
    })

    return requeriment
  }

  async findByPet(petId: string) {
    const requeriments = await prisma.requeriment.findMany({
      where: {
        petId,
      },
    })

    return requeriments
  }
}
