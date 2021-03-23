import { NowRequest, NowResponse } from "@vercel/node";
import { getSession } from "next-auth/client";

import { connectToDatabase } from "@lib/mongodb";
import { ObjectId } from "mongodb";

export default async function startCountdown(
  req: NowRequest,
  res: NowResponse
) {
  const session = await getSession({ req });
  const { id } = session.user;
  const { db } = await connectToDatabase();
  const date = new Date();

  if (!session) {
    return res.status(401).json({
      error: "You are not authorized to access this resource.",
    });
  }

  try {
    if (req.method === "POST") {
      const usersCollection = db.collection("users");
      const countdownCyclesCollection = db.collection("countdown_cycles");

      const user = await usersCollection.findOne({
        _id: new ObjectId(id),
      });

      if (!user) {
        return res.status(400).json({
          error: "User does not exists",
        });
      }

      await countdownCyclesCollection.updateMany(
        { user: session.user.id },
        { $set: { isInvalid: true } }
      );

      const countdown = await countdownCyclesCollection.insertOne({
        startTime: date,
        user: id,
        isInvalid: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return res.status(200).json({
        countdown: countdown.ops,
      });
    }

    return res.status(404).json("Page not found");
  } catch (err) {
    console.log(err);

    return res.status(500).send("Internal Server Error");
  }
}
