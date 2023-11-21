import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { nearbyGymsQuery } from 'schemas/nearbyGymsQuery';

export async function nearby(req: FastifyRequest, res: FastifyReply) {
  const { latitude, longitude } = nearbyGymsQuery.parse(req.query);

  const nearbyGymsUseCase = makeFetchNearbyGymsUseCase();

  const { gyms } = await nearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return res.status(200).send({
    gyms,
  });
}
