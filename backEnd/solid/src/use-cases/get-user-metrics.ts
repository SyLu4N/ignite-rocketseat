import { CheckInsRepository } from '@/repositories/check-ins-repository';

interface GetUserMetricsUseCaseReq {
  userId: string;
}

interface GetUserMetricsUseCaseRes {
  checkInsCount: number;
}

export class GetUserMetricsUseCase {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseReq): Promise<GetUserMetricsUseCaseRes> {
    const checkInsCount = await this.checkInRepository.countByUserId(userId);

    return { checkInsCount };
  }
}
