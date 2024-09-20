import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req = NextApiRequest, res = NextApiResponse) {
  const fileUrl = req.query.url;

  const response = await fetch(fileUrl);
  const data = await response.arrayBuffer();

  res.setHeader('Content-Disposition', 'attachment; filename=Tselots_Resume.pdf');
  res.setHeader('Content-Type', 'application/pdf');
  res.status(200).send(Buffer.from(data));
}
