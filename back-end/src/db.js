import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

let db;

async function connectToDB(callback) {
  const client = new MongoClient(process.env.URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  await client.connect();
  db = client.db("mainDB");
  callback();
}

export { db, connectToDB };