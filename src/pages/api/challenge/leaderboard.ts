import { NowRequest, NowResponse } from "@vercel/node";

import { connectToDatabase } from "@lib/mongodb";

export default async function leaderboard(req: NowRequest, res: NowResponse) {
  const { db } = await connectToDatabase();
  const { page } = req.query;

  const challengesCollection = db.collection("challenges");

  try {
    /**
     * with the "skip" this route loses performance according to the scale application,
     * but for now I will leave it at that.
     */

    const totalChallenges = await challengesCollection.count();
    const pageLimit = 20;
    const totalPage = Math.ceil(totalChallenges / pageLimit);

    const challenges = await challengesCollection
      .find()
      .sort({
        level: -1,
        challengesCompleted: -1,
      })
      .limit(pageLimit)
      .skip((Number(page) - 1) * pageLimit)
      .toArray();

    return res.status(200).json({
      leaderboard: {
        totalPage,
        challenges: challenges,
      },
    });
  } catch (err) {
    console.log(err);

    return res.status(500).send("Internal Server Error");
  }
}
