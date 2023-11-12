import { prisma } from "@/lib/prisma";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { hash } from "bcryptjs";
import { RegisterUseCase } from "@/use-cases/register";
import { PrismaUsersRepository } from "@/repositories/prisma-users-reporsitory";
import { registerBodySchema } from "schema/registerBody";

export async function register(req: FastifyRequest, res: FastifyReply) {
  const { name, email, password } = registerBodySchema.parse(req.body);

  try {
    const prismaUserRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(prismaUserRepository);

    await registerUseCase.execute({ name, email, password });
  } catch (error) {
    return res.status(409).send();
  }

  return res.status(201).send();
}
