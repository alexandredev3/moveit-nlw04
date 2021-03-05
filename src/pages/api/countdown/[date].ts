import { NowRequest, NowResponse } from "@vercel/node";
import { isValid } from "date-fns";
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

async function initialCountdown(req: NowRequest, res: NowResponse) {
  const { date } = req.query;
  const dateToNumber = Number(date);
  const session = ((await getSession({ req })) as unknown) as ISession;
  const { id } = session.user;
  const { client, db } = await connectToDatabase();

  if (!isValid(dateToNumber)) {
    return res.status(400).json({
      error: "Date is invalid.",
    });
  }

  if (!client.isConnected()) {
    return res.status(500).json("Internel Error Server");
  }

  const usersCollection = db.collection("users");
  const countdownCollection = db.collection("countdowns");

  const user = await usersCollection.findOne({
    _id: new ObjectId(id),
  });

  if (!user) {
    return res.status(400).json({
      error: "User does not exists",
    });
  }

  const countdown = await countdownCollection.insertOne({
    time: dateToNumber,
    user: id,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return res.status(200).json({
    countdown: countdown.ops,
  });
}

export default initialCountdown;
