import { UsersRepository } from '@/repositories/users-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { compare } from 'bcryptjs';
import { CheckIn } from '@prisma/client';
import { CheckInsRepository } from '@/repositories/check-ins-repository';

interface CheckInUseCaseReq {
  userId: string;
  gymId: string;
}

interface CheckInUseCaseRes {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckInUseCaseReq): Promise<CheckInUseCaseRes> {
    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return { checkIn };
  }
}
