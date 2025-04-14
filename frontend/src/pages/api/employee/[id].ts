// pages/api/employees/[id].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../../lib/mongoDB';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  const { db } = await connectToDatabase();

  switch (method) {
    case 'DELETE':
      try {
        const result = await db.collection('employees').deleteOne({ _id: new ObjectId(id as string) });
        if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted' });
      } catch (error:any) {
        res.status(500).json({ message: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
