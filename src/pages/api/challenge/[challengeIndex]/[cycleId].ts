import { NowRequest, NowResponse } from "@vercel/node";
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

// when user complete challenge;
export default async function challenge(req: NowRequest, res: NowResponse) {
  const cycleId = req.query.cycleId as string;
  const challengeIndex = req.query.challengeIndex as string;
  const { user } = await getSession({ req });
  const { db } = await connectToDatabase();

  /**
   * Verificar se o time passou de 25 minutos.
   * Verificar se o time já foi usado, pelo "isInvalid".
   */

  try {
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

    const query = {
      $where: () => {
        this.user.id === user.id;
      },
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

    const createdAt = challenge ? challenge.createdAt : new Date();
    const updatedAt = new Date();

    const update = {
      $set: {
        user: {
          id: user.id,
          name: user.name,
          avatar: user.image,
        },
        level,
        challengesCompleted,
        currentExperience,
        experienceToNextLevel,
        createdAt,
        updatedAt,
      },
    };

    const options = {
      returnNewDocument: true,
      upsert: true,
      new: true,
    };

    await challengesCollection.updateOne(query, update, options);

    await countdownCollection.updateOne(
      {
        _id: new ObjectId(cycleId),
      },
      {
        $set: {
          isInvalid: true,
        },
      }
    );

    const challengeCompleted = await challengesCollection.findOne(query);

    return res.status(200).json({
      challenge: challengeCompleted,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).send("Internal Server Error");
  }
}
