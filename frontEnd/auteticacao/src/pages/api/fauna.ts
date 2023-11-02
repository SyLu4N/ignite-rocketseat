import { query as q } from 'faunadb';
import { NextApiRequest, NextApiResponse } from 'next';

import { fauna } from '../../services/fauna';

export default async function createTeste(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, name, password } = req.body.user;

  const user = await fauna.query(
    q.Get(q.Match(q.Index('user_by_email'), q.Casefold(email)))
  );

  console.log(user);

  if (user) {
    return res.status(400).end({ erros: 'E-mail já existe' });
  }

  try {
    await fauna.query(
      q.Create(q.Collection('users'), {
        data: {
          email,
          name,
          password,
        },
      })
    );
  } catch (err) {
    return res.status(400);
  }

  return res.status(200);
}
