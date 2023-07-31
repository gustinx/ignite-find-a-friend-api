import { Organization, Prisma } from '@prisma/client'
import { OrganizationRepository } from '../organization-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrganizationsRepository implements OrganizationRepository {
  public items: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = {
      id: data.id ?? randomUUID(),
      name: data.name,
      postal_code: data.postal_code,
      city: data.city,
      email: data.email,
      address: data.address,
      password_hash: data.password_hash,
      whatsapp: data.whatsapp,
      owner: data.owner,
      created_at: new Date(),
    }

    this.items.push(organization)

    return organization
  }

  async findByEmail(email: string) {
    const organization = this.items.find((item) => item.email === email)

    if (!organization) {
      return null
    }

    return organization
  }

  async findById(id: string) {
    const organization = this.items.find((items) => items.id === id)

    if (!organization) {
      return null
    }

    return organization
  }
}
