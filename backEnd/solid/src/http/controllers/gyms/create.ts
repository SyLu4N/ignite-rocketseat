import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { createGymBody } from 'schemas/createGymBody';

export async function create(req: FastifyRequest, res: FastifyReply) {
  const { title, description, latitude, longitude, phone } =
    createGymBody.parse(req.body);

  const createGymUseCase = makeCreateGymUseCase();

  await createGymUseCase.execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  });

  return res.status(201).send();
}
