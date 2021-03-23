import { ISessionBase } from "next-auth/client";

import { connectToDatabase } from "@lib/mongodb";

export default async function getChallenge(session: ISessionBase) {
  const { db } = await connectToDatabase();
  const challengeCollection = db.collection("challenges");
  const experienceToNextLevel = Math.pow((1 + 1) * 4, 2);

  const challenge = await challengeCollection.findOne({
    'user.id': session.user.id,
  });

  if (!challenge) {
    const challenge = await challengeCollection.insertOne({
      user: {
        id: session.user.id,
        name: session.user.name,
        avatar: session.user.image,
      },
      level: 1,
      challengesCompleted: 0,
      currentExperience: 0,
      experienceToNextLevel: experienceToNextLevel,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return {
      challenge: challenge.ops[0],
    };
  }

  return {
    challenge,
  };
}
