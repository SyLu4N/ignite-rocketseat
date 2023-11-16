import { CheckInsRepository } from '@/repositories/check-ins-repository';
import { GymsRepository } from '@/repositories/gyms-repository';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';
import { CheckIn } from '@prisma/client';

import { MaxDistanceError } from './errors/max-distance-error';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface CheckInUseCaseReq {
  userId: string;
  gymId: string;
  userLatitudade: number;
  userLongitude: number;
}

interface CheckInUseCaseRes {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(
    private checkInRepository: CheckInsRepository,
    private gymsRepository: GymsRepository
  ) {}

  async execute({
    userId,
    gymId,
    userLatitudade,
    userLongitude,
  }: CheckInUseCaseReq): Promise<CheckInUseCaseRes> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) throw new ResourceNotFoundError();

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitudade, longitude: userLongitude },
      { latitude: Number(gym.latitude), longitude: Number(gym.longitude) }
    );

    const MAX_DISTANCE = 0.1; // 100 metros
    if (distance > MAX_DISTANCE) throw new MaxDistanceError();

    const checkDate = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date()
    );
    if (checkDate) throw new MaxNumberOfCheckInsError();

    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return { checkIn };
  }
}
