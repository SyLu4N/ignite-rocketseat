import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';

describe('Search Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test('Deve ser possível buscar uma academia pelo nome', async () => {
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

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        search: 'Test',
      })
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ title: 'Gym Test' }),
    ]);
  });
});
