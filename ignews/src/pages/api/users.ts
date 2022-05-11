import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const users = [
    {id: 1, name: 'Luan'},
    {id: 2, name: 'Lucas'},
    {id: 3, name: 'Luany'},
  ]

  return res.status(200).json(users);
}
