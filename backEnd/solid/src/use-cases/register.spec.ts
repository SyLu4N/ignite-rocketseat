import { expect, test, describe } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InmemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists";

describe("Register Use Case", () => {
  test("Deve ser possível ser cadastrar", async () => {
    const userRepository = new InmemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(userRepository);

    const { user } = await registerUseCase.execute({
      name: "Fulano",
      email: "fulano@hotmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  test("Hash da senha Register", async () => {
    const userRepository = new InmemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(userRepository);

    const { user } = await registerUseCase.execute({
      name: "Fulano",
      email: "fulano@hotmail.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user?.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  test("Não deve ser possível cadastrar-se com o mesmo email", async () => {
    const userRepository = new InmemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(userRepository);

    const data = {
      name: "Fulano",
      email: "fulano@hotmail.com",
      password: "123456",
    };

    await registerUseCase.execute(data);
    await expect(() => registerUseCase.execute(data)).rejects.toBeInstanceOf(
      UserAlreadyExistsError
    );
  });
});
