import { FastifyRequest, FastifyReply } from 'fastify';

export function verifyUserRole(roleToVerify: 'ADMIN' | 'MEMBER') {
  return async (req: FastifyRequest, res: FastifyReply) => {
    const { role } = req.user;

    if (role !== roleToVerify) {
      return res.status(403).send({ message: 'Acesso não autorizado' });
    }
  };
}
