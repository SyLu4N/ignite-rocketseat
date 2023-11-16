import { GymsRepository } from '@/repositories/gyms-repository';
import { Gym } from '@prisma/client';

interface FetchNearbyGymsUseCaseReq {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearbyGymsUseCaseRes {
  gyms: Gym[];
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsUseCaseReq): Promise<FetchNearbyGymsUseCaseRes> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return { gyms };
  }
}
