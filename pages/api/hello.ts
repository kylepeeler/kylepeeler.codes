import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line
export default (_: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ text: 'Hello' });
};
