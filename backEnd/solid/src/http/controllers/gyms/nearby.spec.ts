import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';

describe('Nearby Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test('Deve ser possível buscar academias proximas', async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym Test',
        description: '',
        phone: '',
        latitude: -23.5415496,
        longitude: -46.3145073,
      });

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: 'gym-02',
        title: 'Gym test Longe',
        description: '',
        phone: '',
        latitude: -24.5134947,
        longitude: -47.3222321,
      });

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -23.5415496,
        longitude: -46.3145073,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ title: 'Gym Test' }),
    ]);
  });
});
