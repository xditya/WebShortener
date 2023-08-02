/*
(c) @xditya
View the license: https://github.com/xditya/WebShortener/blob/master/LICENSE
*/
import {
  MongoClient,
  ObjectId,
} from "https://deno.land/x/mongo@v0.31.2/mod.ts";

import config from "../env.ts";

console.log("Connecting to MongoDB...");
const client = new MongoClient();
let { MONGO_URL } = config;
if (!MONGO_URL) {
  console.error("MONGO_URL environment variable must be set");
  Deno.exit(1);
}
if (!MONGO_URL.endsWith("authMechanism=SCRAM-SHA-1")) {
  MONGO_URL += "&authMechanism=SCRAM-SHA-1";
}
try {
  await client.connect(MONGO_URL);
} catch (err) {
  console.error("Error connecting to MongoDB", err);
  throw err;
}
const db = client.database("SelfShortener");

interface UrlSchema {
  _id: ObjectId;
  hash: string;
  url: string;
}

const urls = db.collection<UrlSchema>("URLS");

export function checkIfUrlExists(url: string) {
  return urls.findOne({ url });
}

export async function shortenUrl(url: string) {
  const isUrlExists = await checkIfUrlExists(url);
  if (isUrlExists) {
    return isUrlExists.hash;
  }
  const hash = Math.random().toString(36).substring(2, 7);
  if (await urls.findOne({ hash })) {
    await shortenUrl(url);
    return;
  }
  await urls.insertOne({ url, hash });
  return hash;
}

export async function getUrl(hash: string) {
  return (await urls.findOne({ hash }))?.url;
}
