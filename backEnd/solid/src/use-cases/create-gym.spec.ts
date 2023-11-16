import { InmemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { expect, test, describe, beforeEach } from 'vitest';

import { CreateGymUseCase } from './create-gym';

let sut: CreateGymUseCase;
let gymRepository: InmemoryGymsRepository;

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymRepository = new InmemoryGymsRepository();
    sut = new CreateGymUseCase(gymRepository);
  });

  test('Deve ser possível criar uma academia', async () => {
    const { gym } = await sut.execute({
      title: 'Gym Test',
      description: 'Academia de teste',
      phone: '11 1111-1111',
      latitude: -23.5415496,
      longitude: -46.3145073,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
