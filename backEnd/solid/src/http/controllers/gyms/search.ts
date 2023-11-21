import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { searchGymQuery } from 'schemas/searchGymQuery';

export async function search(req: FastifyRequest, res: FastifyReply) {
  const { search, page } = searchGymQuery.parse(req.query);

  const searchGymUseCase = makeSearchGymsUseCase();

  const { gyms } = await searchGymUseCase.execute({ search, page });

  return res.status(200).send({
    gyms,
  });
}
