import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async filter(query: Partial<Prisma.PetCreateManyOrgInput>) {
    const pets = await prisma.pet.findMany({
      where: query,
    })

    return pets
  }

  async findByCity(city: string) {
    const pets = await prisma.pet.findMany({
      where: { city: { contains: city } },
    })

    return pets
  }
}
