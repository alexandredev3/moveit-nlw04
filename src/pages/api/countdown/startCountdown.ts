import { NowRequest, NowResponse } from "@vercel/node";
import { getSession } from "next-auth/client";

import { connectToDatabase } from "@lib/mongodb";
import { ObjectId } from "mongodb";

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

export default async function startCountdown(req: NowRequest, res: NowResponse) {
  const session = ((await getSession({ req })) as unknown) as ISession;
  const { id } = session.user;
  const { db } = await connectToDatabase();
  const date = new Date();

  try {
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
  } catch (err) {
    console.log(err);

    return res.status(500).send("Internal Server Error");
  }
}
