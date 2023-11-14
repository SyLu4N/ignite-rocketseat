import { PrismaUsersRepository } from '@/repositories/prisma/users-reporsitory';
import { AuthenticateUseCase } from '../authenticate';

export function makeAuthenticateUseCase() {
  const prismaUserRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(prismaUserRepository);

  return authenticateUseCase;
}
