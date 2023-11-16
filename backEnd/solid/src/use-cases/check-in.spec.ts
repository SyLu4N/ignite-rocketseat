import { InmemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { InmemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { expect, test, describe, beforeEach, vi, afterEach } from 'vitest';

import { CheckInUseCase } from './check-in';
import { MaxDistanceError } from './errors/max-distance-error';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error';

let checkInsRepository: InmemoryCheckInRepository;
let gymsRepository: InmemoryGymsRepository;
let sut: CheckInUseCase;

describe('CheckIn Use Case', () => {
  const fixData = {
    gymId: 'gym-01',
    userId: 'user-01',
    userLatitudade: -23.5415496,
    userLongitude: -46.3145073,
  };

  beforeEach(async () => {
    checkInsRepository = new InmemoryCheckInRepository();
    gymsRepository = new InmemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Gym test',
      description: 'Academia de teste',
      phone: '11 1111 1111',
      latitude: -23.5415496,
      longitude: -46.3145073,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('Deve ser possível criar um CheckIn', async () => {
    const { checkIn } = await sut.execute(fixData);

    expect(checkIn.id).toEqual(expect.any(String));
  });

  test('Não deve ser possível fazer checkIn 2x ao dia', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute(fixData);

    await expect(() => sut.execute(fixData)).rejects.toBeInstanceOf(
      MaxNumberOfCheckInsError
    );
  });

  test('Deve ser possível fazer checkIn em dias diferentes', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
    await sut.execute(fixData);

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));
    const { checkIn } = await sut.execute(fixData);

    expect(checkIn.id).toEqual(expect.any(String));
  });

  test('Não deve ser possível criar um CheckIn longe da academia', async () => {
    await gymsRepository.create({
      id: 'gym-02',
      title: 'Gym test',
      description: 'Academia de teste 02',
      phone: '22 2222 2222',
      latitude: -23.5134947,
      longitude: -46.3222321,
    });

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitudade: -23.5415496,
        userLongitude: -46.3145073,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
