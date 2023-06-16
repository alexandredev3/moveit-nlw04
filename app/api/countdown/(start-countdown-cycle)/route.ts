import { NextRequest, NextResponse } from "next/server";
import { query as q } from "faunadb";
import { getToken } from "next-auth/jwt";

import {
  faunadbClient,
  CollectionIndexes,
  Collections,
} from "@/services/faunadb";

type CountdownCycle = {
  data: {
    has_ended: boolean;
  };
  ref: {
    id: string;
  };
};

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  const userId = token?.sub;

  if (!token) {
    return NextResponse.json(
      {
        error: "You are not authorized to access this resource.",
      },
      { status: 401 }
    );
  }

  try {
    const user = await faunadbClient.query(
      q.Match(q.Index(CollectionIndexes.USER_BY_PROVIDER_ACCOUNT_ID), userId!)
    );

    if (!user) {
      return NextResponse.json(
        {
          error: "User does not exists",
        },
        { status: 400 }
      );
    }

    const userCountdownCycle =
      await faunadbClient.query<CountdownCycle>(
        q.Let(
          {
            exists: q.Match(
              q.Index(CollectionIndexes.COUNTDOWN_CYCLE_BY_USER_ID),
              userId!
            )
          },
          q.If(
            q.Exists(q.Var('exists')),
            q.Get(q.Var('exists')),
            null
          )
        )
      );

    const cycleStartAt = Date.now();

    if (!userCountdownCycle) {
      await faunadbClient.query<CountdownCycle>(
        q.Create(q.Collection(Collections.COUNTDOWN_CYCLES), {
          data: {
            user_id: userId,
            has_ended: false,
            cycle_start_at: cycleStartAt,
          },
        }),
      );

      return NextResponse.json(null, { status: 201 });
    }

    const cycleHasEnded = userCountdownCycle.data.has_ended;

    if (!cycleHasEnded) {
      return NextResponse.json(
        { error: "You already have a cycle in progress" },
        { status: 401 }
      );
    }

    await faunadbClient.query(
      q.Update(
        q.Ref(
          q.Collection(Collections.COUNTDOWN_CYCLES),
          userCountdownCycle.ref.id
        ),
        {
          data: {
            has_ended: false,
            cycle_start_at: cycleStartAt,
          },
        }
      )
    );

    return NextResponse.json(null, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
