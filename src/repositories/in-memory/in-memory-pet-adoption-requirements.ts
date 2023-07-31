import { Prisma, Requeriment } from '@prisma/client'
import { PetAdoptionRequirementsRepository } from '../pet-adoption-requirements-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetAdoptionRequeriments
  implements PetAdoptionRequirementsRepository
{
  public items: Requeriment[] = []

  async create(data: Prisma.RequerimentUncheckedCreateInput) {
    const requeriment = {
      id: data.id ?? randomUUID(),
      description: data.description,
      petId: data.petId,
      created_at: new Date(),
    }

    this.items.push(requeriment)

    return requeriment
  }

  async findByPet(petId: string) {
    return this.items.filter((item) => item.petId === petId)
  }
}
