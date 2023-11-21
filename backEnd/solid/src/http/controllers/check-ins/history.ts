import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { checkInHistoryQuery } from 'schemas/checkInHistoryQuery';

export async function history(req: FastifyRequest, res: FastifyReply) {
  const { page } = checkInHistoryQuery.parse(req.query);

  const checkInHistoryUseCase = makeFetchUserCheckInsHistoryUseCase();

  const { checkIns } = await checkInHistoryUseCase.execute({
    page,
    userId: req.user.sub,
  });

  return res.status(200).send({
    checkIns,
  });
}
