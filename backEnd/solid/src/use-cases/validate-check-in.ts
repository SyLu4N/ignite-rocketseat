import { CheckInsRepository } from '@/repositories/check-ins-repository';
import { GymsRepository } from '@/repositories/gyms-repository';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';
import { CheckIn } from '@prisma/client';

import { MaxDistanceError } from './errors/max-distance-error';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface ValidateCheckInUseCaseReq {
  checkInId: string;
}

interface ValidateCheckInUseCaseRes {
  checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseReq): Promise<ValidateCheckInUseCaseRes> {
    const checkIn = await this.checkInRepository.findById(checkInId);
    if (!checkIn) throw new ResourceNotFoundError();

    checkIn.validated_at = new Date();

    await this.checkInRepository.save(checkIn);

    return { checkIn };
  }
}
