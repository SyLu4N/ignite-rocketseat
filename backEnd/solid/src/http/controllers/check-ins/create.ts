import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import {
  createCheckInBody,
  createCheckInQuery,
} from 'schemas/createCheckInBody';

export async function create(req: FastifyRequest, res: FastifyReply) {
  const { latitude, longitude } = createCheckInBody.parse(req.body);
  const { gymId } = createCheckInQuery.parse(req.params);

  const checkInUseCase = makeCheckInUseCase();

  await checkInUseCase.execute({
    gymId,
    userId: req.user.sub,
    userLatitudade: latitude,
    userLongitude: longitude,
  });

  return res.status(201).send();
}
