import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function getEmails() {
  await client.connect();
  const db = client.db("email_list_app");

  const emails = await db
    .collection("emails")
    .find({}, { _id: 1, name: 1, email: 1 })
    .sort({ name: 1 })
    .toArray();

  return emails;
}

export async function getEmail(id) {
  await client.connect();
  const db = client.db("email_list_app");

  return db.collection("emails").findOne({ _id: new ObjectId(id) });
}

export async function addEmail({ name, email }) {
  await client.connect();
  const db = client.db("email_list_app");

  return db.collection("emails").insertOne({ name, email });
}
