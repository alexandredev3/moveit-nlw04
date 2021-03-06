import { NowRequest, NowResponse } from "@vercel/node";
import { getSession } from "next-auth/client";
import { ObjectId } from "mongodb";
import { addMinutes, isAfter, toDate } from "date-fns";

import { connectToDatabase } from "@lib/mongodb";
import challenges from "@/challenges.json";
import { calculateChallenges } from "@lib/calculateChallenges";

interface ISession {
  user: {
    id: string;
    name: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
  };
  accessToken: string;
  expires: Date;
}

interface ActiveChallenge {
  type: "body" | "eye";
  amount: number;
  description: string;
}

// when user complete challenge;
export default async function challenge(req: NowRequest, res: NowResponse) {
  const cycleId = req.query.cycleId as string;
  const challengeIndex = req.query.challengeIndex as string;
  const { user } = ((await getSession({ req })) as unknown) as ISession;
  const { db } = await connectToDatabase();

  /**
   * Verificar se o time passou de 25 minutos.
   * Verificar se o time já foi usado, pelo "isInvalid".
   */

  const countdownCollection = db.collection("countdown_cycles");
  const challengesCollection = db.collection("challenges");

  const countdown = await countdownCollection.findOne({
    _id: new ObjectId(cycleId),
    isInvalid: false,
    $where: () => {
      this.user === user.id;
    },
  });

  if (!countdown) {
    return res.status(400).json({
      error: "You did not start a countdown cycle",
    });
  }

  // por enquanto vai ser 2 minutos para testes
  const endingTime = toDate(addMinutes(countdown.endingTime, 2));
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

  const challenge = await challengesCollection.findOne({
    user: user.id,
  });

  const {
    challengesCompleted,
    experienceToNextLevel,
    level,
    currentExperience,
  } = calculateChallenges({
    challenge,
    activeChallenge,
  });

  const { value } = await challengesCollection.findOneAndUpdate(
    {
      user: user.id,
    },
    {
      $set: {
        level,
        challengesCompleted,
        currentExperience,
        experienceToNextLevel,
        createdAt: challenge ? challenge.createdAt : new Date(),
        updatedAt: new Date(),
      },
    },
    {
      upsert: true,
    }
  );

  await countdownCollection.findOneAndUpdate(
    {
      _id: new ObjectId(cycleId),
    },
    {
      $set: {
        isInvalid: true,
      },
    }
  );

  if (!value) {
    return res.status(200).json({
      challenge: {
        id: new ObjectId(),
        challengesCompleted,
        experienceToNextLevel,
        level,
        currentExperience,
        user: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  return res.status(200).json({
    challenge: value,
  });
}
