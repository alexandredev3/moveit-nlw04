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

let cachedClient: any;
let cachedDb: any;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return {
      cachedClient,
      cachedDb,
    };
  }

  const options: MongoClientOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  const client = await MongoClient.connect(MONGODB_URI, options);

  const db = await client.db(MONGODB_DB);

  cachedClient = client;
  cachedDb = db;

  return {
    client,
    db,
  };
}
