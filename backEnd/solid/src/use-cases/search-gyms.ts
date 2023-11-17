import { GymsRepository } from '@/repositories/gyms-repository';
import { Gym } from '@prisma/client';

interface SearchGymsUseCaseReq {
  search: string;
  page: number;
}

interface SearchGymsUseCaseRes {
  gyms: Gym[];
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    search,
    page,
  }: SearchGymsUseCaseReq): Promise<SearchGymsUseCaseRes> {
    const gyms = await this.gymsRepository.searchMany(search, page);

    return { gyms };
  }
}
