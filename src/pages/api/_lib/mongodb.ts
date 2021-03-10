import { MongoClient, MongoClientOptions } from "mongodb";

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

let cached = global.mongo;

if (!cached) {
  cached = global.mongo = {
    conn: null,
    promise: null,
  };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options: MongoClientOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = MongoClient.connect(MONGODB_URI, options).then(
      (client) => {
        return {
          client,
          db: client.db(MONGODB_DB),
        };
      }
    );
  }

  cached.conn = await cached.promise;
  return cached.conn;
}