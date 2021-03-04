import { NowRequest, NowResponse } from "@vercel/node";
import mongoose from "mongoose";

const { MONGODB_URI, MONGODB_DB } = process.env;

if (!MONGODB_URI) {
  throw new Error(
    "Please define MONGODB_URI environment variable inside .env.local"
  );
} else if (!MONGODB_DB) {
  throw new Error(
    "Please define MONGODB_DB environment variable inside .env.local"
  );
}

// @ts-ignore
let cached: global.mongo;

if (!cached) {
  // @ts-ignore
  cached = global.mongo = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = (handler: any) => async (
  req: NowRequest,
  res: NowResponse
) => {
  if (cached.conn) {
    return handler(req, res);
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  }

  cached.conn = await cached.promise;
  return handler(req, res);
};
