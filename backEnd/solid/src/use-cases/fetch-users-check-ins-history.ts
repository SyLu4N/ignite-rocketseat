import { CheckInsRepository } from '@/repositories/check-ins-repository';
import { CheckIn } from '@prisma/client';

interface FetchUsersCheckInsHistoryUseCaseReq {
  userId: string;
  page: number;
}

interface FetchUsersCheckInsHistoryUseCaseRes {
  checkIns: CheckIn[];
}

export class FetchUsersCheckInsHistoryUseCase {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUsersCheckInsHistoryUseCaseReq): Promise<FetchUsersCheckInsHistoryUseCaseRes> {
    const checkIns = await this.checkInRepository.findManyByUserId(
      userId,
      page
    );

    return { checkIns };
  }
}
