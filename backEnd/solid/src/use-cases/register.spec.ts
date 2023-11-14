import { expect, test, describe, beforeEach } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InmemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

let sut: RegisterUseCase;
let userRepository: InmemoryUsersRepository;

describe('Register Use Case', () => {
  beforeEach(() => {
    userRepository = new InmemoryUsersRepository();
    sut = new RegisterUseCase(userRepository);
  });

  test('Deve ser possível se cadastrar', async () => {
    const { user } = await sut.execute({
      name: 'Fulano',
      email: 'fulano@hotmail.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  test('Hash da senha Register', async () => {
    const { user } = await sut.execute({
      name: 'Fulano',
      email: 'fulano@hotmail.com',
      password: '123456',
    });

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user?.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  test('Não deve ser possível cadastrar-se com o mesmo email', async () => {
    const data = {
      name: 'Fulano',
      email: 'fulano@hotmail.com',
      password: '123456',
    };

    await sut.execute(data);

    await expect(() => sut.execute(data)).rejects.toBeInstanceOf(
      UserAlreadyExistsError
    );
  });
});
