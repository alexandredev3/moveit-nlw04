import { VercelResponse, VercelRequest } from '@vercel/node';
import { getSession } from 'next-auth/client';

import { connectToDatabase } from '@lib/mongodb';
import { ObjectId } from 'mongodb';

export async function getUpdateUser(id: string) {
  const { db } = await connectToDatabase();

  const usersCollection = db.collection('users');

  try {
    const user = await usersCollection.findOne(
      { _id: new ObjectId(id) },
    );

    return user;
  } catch(err) {
    throw new Error(err);
  }
}