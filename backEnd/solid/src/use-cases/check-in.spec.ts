import { expect, test, describe, beforeEach } from 'vitest';

import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { InmemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './check-in';

let checkInRepository: InmemoryCheckInRepository;
let sut: CheckInUseCase;

describe('CheckIn Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InmemoryCheckInRepository();
    sut = new CheckInUseCase(checkInRepository);
  });

  test('Deve ser possível criar um CheckIn', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
