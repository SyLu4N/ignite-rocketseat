import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma.check-ins-repository';

import { FetchUsersCheckInsHistoryUseCase } from '../fetch-users-check-ins-history';

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new FetchUsersCheckInsHistoryUseCase(checkInsRepository);

  return useCase;
}
