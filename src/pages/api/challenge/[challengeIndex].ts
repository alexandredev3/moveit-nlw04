import { VercelRequest, VercelResponse } from "@vercel/node";
import { getSession } from "next-auth/client";
import { ObjectId } from "mongodb";
import { addMinutes, isAfter, toDate } from "date-fns";

import { connectToDatabase } from "@lib/mongodb";
import challenges from "@/challenges.json";
import { calculateChallenges } from "@lib/calculateChallenges";

interface ActiveChallenge {
  type: "body" | "eye";
  amount: number;
  description: string;
}

// when user complete a challenge;
export default async function completeChallenge(
  req: VercelRequest,
  res: VercelResponse
) {
  const challengeIndex = req.query.challengeIndex as string;
  const session = await getSession({ req });
  const { db } = await connectToDatabase();

  /**
   * Verificar se o time passou de 25 minutos.
   * Verificar se o time já foi usado, pelo "isInvalid".
   */

  if (!session) {
    return res.status(401).json({
      error: "You are not authorized to access this resource.",
    });
  }

  const countdownCollection = db.collection("countdown_cycles");
  const challengesCollection = db.collection("challenges");

  const countdown = await countdownCollection
    .find({
      isInvalid: false,
      $where: () => {
        this.user === session.user.id;
      },
    })
    .sort({
      startTime: -1,
    })
    .toArray();

  const recentCountdownCycle = countdown[0];

  if (!recentCountdownCycle) {
    return res.status(400).json({
      error: "You did not start a countdown cycle",
    });
  }

  const { startTime } = recentCountdownCycle;

  const endingTime = toDate(addMinutes(startTime, 1));
  const timeToCompareEndingTime = toDate(new Date());

  if (isAfter(endingTime, timeToCompareEndingTime)) {
    return res.status(400).json({
      error: "Your countdown cycle is not over yet.",
    });
  }

  const activeChallenge = challenges[challengeIndex] as ActiveChallenge;

  if (!activeChallenge) {
    return res.status(400).json({
      error: "This challenge does not exist.",
    });
  }

  const query = {
    'user.id': session.user.id,
  };

  const challenge = await challengesCollection.findOne(query);

  const {
    challengesCompleted,
    experienceToNextLevel,
    level,
    currentExperience,
  } = calculateChallenges({
    challenge,
    activeChallenge,
  });

  await challengesCollection.updateOne(query, {
    $set: {
      level,
      challengesCompleted,
      currentExperience,
      experienceToNextLevel,
      updatedAt: new Date(),
    },
  });

  await countdownCollection.updateOne(
    {
      _id: new ObjectId(recentCountdownCycle._id),
    },
    {
      $set: {
        isInvalid: true,
      },
    }
  );

  return res.end();
}

