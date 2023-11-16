import { InmemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { expect, test, describe, beforeEach } from 'vitest';

import { FetchUsersCheckInsHistoryUseCase } from './fetch-users-check-ins-history';

let checkInsRepository: InmemoryCheckInRepository;
let sut: FetchUsersCheckInsHistoryUseCase;

describe('Fetch User Check-In History Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InmemoryCheckInRepository();
    sut = new FetchUsersCheckInsHistoryUseCase(checkInsRepository);
  });

  test('Deve ser possível visualizar o histórico de check-ins', async () => {
    await checkInsRepository.create({ gym_id: 'gym-01', user_id: 'user-01' });
    await checkInsRepository.create({ gym_id: 'gym-02', user_id: 'user-01' });

    const { checkIns } = await sut.execute({ userId: 'user-01', page: 1 });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ]);
  });

  test('Deve ser possível obter o historico check-ins paginado ', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-01',
      });
    }

    const { checkIns } = await sut.execute({ userId: 'user-01', page: 2 });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ]);
  });
});
