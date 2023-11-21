import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { validateCheckInParams } from 'schemas/validateCheckInParams';

export async function validate(req: FastifyRequest, res: FastifyReply) {
  const { checkInId } = validateCheckInParams.parse(req.params);

  const validateCheckInUseCase = makeValidateCheckInUseCase();

  await validateCheckInUseCase.execute({
    checkInId,
  });

  return res.status(204).send();
}
