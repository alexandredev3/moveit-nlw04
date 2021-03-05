import { NowRequest, NowResponse } from "@vercel/node";
import { ObjectId } from "mongodb";
import { getSession } from "next-auth/client";

import { connectToDatabase } from "@lib/mongodb";

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

export default async function challenge(req: NowRequest, res: NowResponse) {
  const time = req.query.time as string;
  const { user } = ((await getSession({ req })) as unknown) as ISession;
  const { client, db } = await connectToDatabase();

  if (client.isConnected()) {
    const countdownCollection = db.collection("countdowns");

    const countdown = await countdownCollection.findOne({
      time: Number(time),
      isInvalid: false,
      $where: () => {
        this.user === user.id;
      },
    });

    if (!countdown) {
      return res.status(400).json({
        error: "You did not start a cycle",
      });
    }

    return res.status(200).json({
      countdown,
    });
  }
}
