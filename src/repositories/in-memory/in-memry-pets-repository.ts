import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      about: data.about,
      city: data.city,
      age: data.age,
      size: data.size,
      energy: data.energy,
      independence_level: data.independence_level,
      environment: data.environment,
      organization_id: data.organization_id,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async filter(query: Partial<Prisma.PetCreateManyOrgInput>) {
    return this.items.filter((item) => {
      for (const key in query) {
        if (
          item[key as keyof Prisma.PetCreateManyOrgInput] !==
          query[key as keyof Prisma.PetCreateManyOrgInput]
        ) {
          return false
        }
      }
      return true
    })
  }

  async findByCity(city: string) {
    return this.items.filter((item) => item.city === city)
  }
}
