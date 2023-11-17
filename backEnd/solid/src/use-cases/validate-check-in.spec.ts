import { InmemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { expect, test, describe, beforeEach, vi, afterEach } from 'vitest';

import { LateCheckInValidationError } from './errors/late-check-in-validation-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { ValidateCheckInUseCase } from './validate-check-in';

let checkInsRepository: InmemoryCheckInRepository;
let sut: ValidateCheckInUseCase;

describe('Validate CheckIn Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InmemoryCheckInRepository();
    sut = new ValidateCheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

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

  test('Não deve ser possível validar um check-in após 20 minutos da sua validação', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    });

    const advanceTime = 1000 * 60 * 21; // 21 Minutos

    vi.advanceTimersByTime(advanceTime);

    await expect(() =>
      sut.execute({ checkInId: createdCheckIn.id })
    ).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});
