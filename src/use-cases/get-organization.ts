import { OrganizationRepository } from '@/repositories/organization-repository'
import { Organization } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetOrganizationUseCaseRequest {
  organizationId: string
}

interface GetOrganizationUseCaseResponse {
  organization: Organization
}

export class GetOrganizationUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute({
    organizationId,
  }: GetOrganizationUseCaseRequest): Promise<GetOrganizationUseCaseResponse> {
    const organization = await this.organizationRepository.findById(
      organizationId,
    )

    if (!organization) {
      throw new ResourceNotFoundError()
    }

    return { organization }
  }
}
