import { InmemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { expect, test, describe, beforeEach } from 'vitest';

import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { GetUserProfileUseCase } from './get-user-profile';

let userRepository: InmemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    userRepository = new InmemoryUsersRepository();
    sut = new GetUserProfileUseCase(userRepository);
  });

  test('Deve ser possível visualizar o perfil', async () => {
    const createdUser = await userRepository.create({
      name: 'Fulano',
      email: 'fulano@hotmail.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await sut.execute({ userId: createdUser.id });

    expect(user.name).toEqual('Fulano');
  });

  test('Não deve ser possível visualizar o perfil com id um inválido', async () => {
    await expect(() =>
      sut.execute({ userId: 'not-existing-id' })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
