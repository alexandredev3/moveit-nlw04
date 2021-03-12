declare module NodeJS {
  interface Global {
    mongo: {
      conn: {
        db: Db;
        client: MongoClient;
      }
      promise: Promise<{
        db: any;
        client: any;
      }>;
    };
  }
}