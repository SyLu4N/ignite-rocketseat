import { app } from '@/app';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';

describe('Autenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test('Deve ser possível se autenticar', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response.body).toEqual({ token: expect.any(String) });
  });
});