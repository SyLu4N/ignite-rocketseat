import { InmemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { expect, test, describe, beforeEach } from 'vitest';

import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms';

let gymsRepository: InmemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InmemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  test('Deve ser possível localizar academias proximas (até 10km)', async () => {
    await gymsRepository.create({
      id: 'gym-01',
      title: 'Academia perto',
      description: '',
      phone: '',
      latitude: -23.5415391,
      longitude: -46.3866176,
    });

    await gymsRepository.create({
      id: 'gym-02',
      title: 'Academia longe',
      description: '',
      phone: '',
      latitude: -23.4889427,
      longitude: -46.6250802,
    });

    const { gyms } = await sut.execute({
      userLatitude: -23.5415496,
      userLongitude: -46.3145073,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Academia perto' }),
    ]);
  });
});
