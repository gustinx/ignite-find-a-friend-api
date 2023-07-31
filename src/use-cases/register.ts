import { OrganizationRepository } from '@/repositories/organization-repository'
import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  owner: string
  email: string
  password: string
  address: string
  city: string
  postal_code: string
  whatsapp: string
}

interface RegisterUseCaseResponse {
  organization: Organization
}

export class RegisterUserCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute({
    name,
    owner,
    email,
    password,
    address,
    city,
    postal_code,
    whatsapp,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const checkOrganizationWithSameEmail =
      await this.organizationRepository.findByEmail(email)

    if (checkOrganizationWithSameEmail) {
      throw new OrganizationAlreadyExistsError()
    }

    const organization = await this.organizationRepository.create({
      name,
      owner,
      email,
      password_hash,
      address,
      city,
      postal_code,
      whatsapp,
    })

    return { organization }
  }
}
