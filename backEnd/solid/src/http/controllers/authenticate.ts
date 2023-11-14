import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaUsersRepository } from '@/repositories/prisma/users-reporsitory';
import { AuthenticateUseCase } from '@/use-cases/authenticate';
import { authenticateBodySchema } from 'schema/authenticateBody';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case';

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const { email, password } = authenticateBodySchema.parse(req.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    await authenticateUseCase.execute({ email, password });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return res.status(400).send({ message: error.message });
    }

    throw error;
  }

  return res.status(200).send();
}
