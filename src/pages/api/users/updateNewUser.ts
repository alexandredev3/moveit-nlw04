import { VercelResponse, VercelRequest } from '@vercel/node';
import { getSession } from 'next-auth/client';

import { connectToDatabase } from '@lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function update(req: VercelRequest, res: VercelResponse) {
  const { db } = await connectToDatabase();
  const { user } = await getSession({ req });

  const usersCollection = db.collection('users');

  try {
    await usersCollection.update(
      { _id: new ObjectId(user.id) },
      { isNewUser: false }
    );
  } catch(err) {
    return res.status(500).send('Internal Server Error');
  }
}