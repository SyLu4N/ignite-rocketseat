import { GymsRepository } from '@/repositories/gyms-repository';
import { Gym } from '@prisma/client';

interface SearchGymUseCaseReq {
  search: string;
  page: number;
}

interface SearchGymUseCaseRes {
  gyms: Gym[];
}

export class SearchGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    search,
    page,
  }: SearchGymUseCaseReq): Promise<SearchGymUseCaseRes> {
    const gyms = await this.gymsRepository.searchMany(search, page);

    return { gyms };
  }
}
