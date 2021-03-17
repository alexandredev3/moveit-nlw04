import { ISessionBase } from "next-auth/client";

import { connectToDatabase } from "@lib/mongodb";

const { NODE_ENV, URL } = process.env;

export default async function getChallenge(session: ISessionBase) {
  const { db } = await connectToDatabase();
  const challengeCollection = db.collection("challenges");
  const experienceToNextLevel = Math.pow((1 + 1) * 4, 2);
  const query = {
    $where: () => {
      this.user.id === session.user.id;
    },
  };

  const challenge = await challengeCollection.findOne(query);

  if (!challenge) {
    const challenge = await challengeCollection.insert({
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
      challenge: challenge.ops,
    };
  }

  const thumbnailUrl = NODE_ENV === 'development' 
    ? 'http://localhost:3000/api/thumbnail' 
    : `${URL}/api/thumbnail`;

  return {
    challenge,
    thumbnailUrl: `${thumbnailUrl}?id=${session.user.id}`
  };
}
