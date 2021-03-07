import { NowRequest, NowResponse } from "@vercel/node";

import { connectToDatabase } from "@lib/mongodb";

export default async function leaderboard(req: NowRequest, res: NowResponse) {
  const { db } = await connectToDatabase();

  const challengesCollection = db.collection("challenges");

  /**
   * filtro para colocar quem fez mais desafios nos primeiros indexes do array leaderboard.
   */

  try {
    const challengesCursor = await challengesCollection.find().sort({
      level: -1,
      challengesCompleted: -1,
    });
    const leaderboard: any[] = [];

    await challengesCursor.forEach(async (doc) => leaderboard.push(doc));

    return res.status(200).json({
      leaderboard,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).send("Internal Server Error");
  }
}
