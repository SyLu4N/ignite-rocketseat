import { InmemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { expect, test, describe, beforeEach } from 'vitest';

import { SearchGymsUseCase } from './search-gyms';

let gymsRepository: InmemoryGymsRepository;
let sut: SearchGymsUseCase;

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InmemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  test('Deve ser possível localizar uma academia pelo nome', async () => {
    await gymsRepository.create({
      id: 'gym-01',
      title: 'JavaScript test',
      description: 'Academia de teste',
      phone: '11 1111 1111',
      latitude: -23.5415496,
      longitude: -46.3145073,
    });

    await gymsRepository.create({
      id: 'gym-01',
      title: 'TypeScript test',
      description: 'Academia de teste',
      phone: '11 1111 1111',
      latitude: -23.5415496,
      longitude: -46.3145073,
    });

    const { gyms } = await sut.execute({ search: 'JavaScript', page: 1 });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript test' }),
    ]);
  });

  test('Academias filtradas pelo search deve estar paginadas', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        id: `gym-${i}`,
        title: 'Gym test',
        description: '',
        phone: '',
        latitude: -23.5415496,
        longitude: -46.3145073,
      });
    }

    const { gyms } = await sut.execute({ search: 'Gym test', page: 2 });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym test' }),
      expect.objectContaining({ title: 'Gym test' }),
    ]);
  });
});
