import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { RegisterUserCase } from '../register'

export function makeRegisterUseCase() {
  const organizationRepostiory = new PrismaOrganizationsRepository()
  const useCase = new RegisterUserCase(organizationRepostiory)

  return useCase
}
