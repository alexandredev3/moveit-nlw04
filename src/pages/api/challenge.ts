import { NowRequest, NowResponse } from '@vercel/node';
import { getSession } from 'next-auth/client';

import { connectToDatabase } from '@lib/mongodb';

export default async function challenge(req: NowRequest, res: NowResponse) {
  const { db } = await connectToDatabase();
  const { user } = await getSession({ req });

  const challengeCollection = db.collection("challenges");

  try {
    const query = {
      $where: () => {
        this.user.id === user.id
      }
    }

    const challenge = await challengeCollection.findOne(query);

    const { 
      _id,
      level,
      challengesCompleted,
      currentExperience, 
      experienceToNextLevel,
      createdAt,
      updatedAt,
    } = challenge

    return res.status(200).json({
      challenge: {
        _id,
        level,
        challengesCompleted,
        currentExperience, 
        experienceToNextLevel,
        createdAt,
        updatedAt, 
      }
    });
  } catch(err) {
    console.log(err);

    return res.status(500).json("Internel Server Error");
  }
}