import { NowRequest, NowResponse } from "@vercel/node";
import { isValid } from "date-fns";
import { getSession } from "next-auth/client";

import { connectToDatabase } from "../_lib/mongoose";
import User from "../_lib/schemas/User";
import Countdown from "../_lib/schemas/Countdown";

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

  if (!isValid(dateToNumber)) {
    return res.status(400).json({
      error: "Date is invalid.",
    });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(400).json({
      error: "User does not exists",
    });
  }

  const countdown = await Countdown.create({
    time: dateToNumber,
    user: id,
  });

  await countdown.save();

  return res.status(200).json(countdown);
}

export default connectToDatabase(initialCountdown);
