import { FastifyRequest, FastifyReply } from 'fastify';
import { RegisterUseCase } from '@/use-cases/register';
import { PrismaUsersRepository } from '@/repositories/prisma/users-reporsitory';
import { registerBodySchema } from 'schema/registerBody';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case';

export async function register(req: FastifyRequest, res: FastifyReply) {
  const { name, email, password } = registerBodySchema.parse(req.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({ name, email, password });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return res.status(409).send({ message: error.message });
    }

    throw error;
  }

  return res.status(201).send();
}
