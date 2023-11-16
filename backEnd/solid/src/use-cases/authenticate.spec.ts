import { InmemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { expect, test, describe, beforeEach } from 'vitest';

import { AuthenticateUseCase } from './authenticate';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

let userRepository: InmemoryUsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    userRepository = new InmemoryUsersRepository();
    sut = new AuthenticateUseCase(userRepository);
  });

  test('Deve ser possível se autenticar', async () => {
    await userRepository.create({
      name: 'Fulano',
      email: 'fulano@hotmail.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await sut.execute({
      email: 'fulano@hotmail.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  test('Não deve ser possível se autenticar com um e-mail inválido', async () => {
    const data = {
      email: 'fulano@hotmail.com',
      password: '123456',
    };

    await expect(() => sut.execute(data)).rejects.toBeInstanceOf(
      InvalidCredentialsError
    );
  });

  test('Não deve ser possível se autenticar com uma senha inválida', async () => {
    await userRepository.create({
      name: 'Fulano',
      email: 'fulano@hotmail.com',
      password_hash: await hash('123456', 6),
    });

    const data = { email: 'fulano@hotmail.com', password: '123123' };

    await expect(() => sut.execute(data)).rejects.toBeInstanceOf(
      InvalidCredentialsError
    );
  });
});
