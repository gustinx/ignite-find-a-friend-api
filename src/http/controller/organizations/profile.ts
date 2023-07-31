import { makeGetOrganizationUseCase } from '@/use-cases/factories/make-get-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const organizationProfile = makeGetOrganizationUseCase()

  const { organization } = await organizationProfile.execute({
    organizationId: request.user.sub,
  })

  reply.status(200).send({
    organization: {
      ...organization,
      password_hash: undefined,
    },
  })
}
