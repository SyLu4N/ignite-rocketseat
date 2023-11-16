import { InmemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { InmemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { expect, test, describe, beforeEach, vi, afterEach } from 'vitest';

import { CheckInUseCase } from './check-in';
import { MaxDistanceError } from './errors/max-distance-error';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error';
import { ValidateCheckInUseCase } from './validate-check-in';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let checkInsRepository: InmemoryCheckInRepository;
let sut: ValidateCheckInUseCase;

describe('Validate CheckIn Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InmemoryCheckInRepository();
    sut = new ValidateCheckInUseCase(checkInsRepository);

    //vi.useFakeTimers();
  });

  /* afterEach(() => {
    vi.useRealTimers();
  }); */

  test('Deve ser possível validar um check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    });

    const { checkIn } = await sut.execute({ checkInId: createdCheckIn.id });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date));
  });

  test('Não deve ser possível validar um check-in inválido', async () => {
    await expect(() =>
      sut.execute({ checkInId: 'invalid-id' })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
