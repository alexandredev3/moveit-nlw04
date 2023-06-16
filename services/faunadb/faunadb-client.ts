import { Client } from 'faunadb';

const FAUNADB_SECRET_KEY = process.env.FAUNADB_SECRET_KEY;

if (!FAUNADB_SECRET_KEY) {
  throw new Error('`FAUNADB_SECRET_KEY` not provided');
}

export const faunadbClient = new Client({
  secret: FAUNADB_SECRET_KEY
});