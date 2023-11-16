import { InmemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { expect, test, describe, beforeEach } from 'vitest';

import { GetUserMetricsUseCase } from './get-user-metrics';

let checkInsRepository: InmemoryCheckInRepository;
let sut: GetUserMetricsUseCase;

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InmemoryCheckInRepository();
    sut = new GetUserMetricsUseCase(checkInsRepository);
  });

  test('Deve ser possível obter o número de check-in já realizados', async () => {
    const data = { gym_id: 'gym-01', user_id: 'user-01' };

    await checkInsRepository.create(data);
    await checkInsRepository.create(data);

    const { checkInsCount } = await sut.execute({ userId: 'user-01' });

    expect(checkInsCount).toEqual(2);
  });
});
