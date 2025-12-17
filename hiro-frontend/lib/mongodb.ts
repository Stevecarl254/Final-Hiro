import { MongoClient } from "mongodb";

const uri = "mongodb://127.0.0.1:27017"; // your local MongoDB URI
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!globalThis._mongoClientPromise) {
  client = new MongoClient(uri, options);
  globalThis._mongoClientPromise = client.connect();
}
clientPromise = globalThis._mongoClientPromise;

export default clientPromise;