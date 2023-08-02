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
const MONGO_URL = new URL(config.MONGO_URL);
if (!MONGO_URL.searchParams.has("authMechanism")) {
  MONGO_URL.searchParams.set("authMechanism", "SCRAM-SHA-1");
}
try {
  await client.connect(MONGO_URL.href);
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
  let hash = Math.random().toString(36).substring(2, 7);
  while (await urls.findOne({ hash })) {
    hash = Math.random().toString(36).substring(2, 7);
  }
  await urls.insertOne({ url, hash });
  return hash;
}

export async function getUrl(hash: string) {
  return (await urls.findOne({ hash }))?.url;
}
