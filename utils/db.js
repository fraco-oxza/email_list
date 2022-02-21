/*
 * File for database-related functions
 * and variables
 */

import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

/** Function to get all emails
 *  in the database
 *  @returns all emails
 */
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

/* Function to get a specific email
 * from database
 * @param id Id of document as plain text
 * @return one document that match with the id
 */
export async function getEmail(id) {
  await client.connect();
  const db = client.db("email_list_app");

  return db.collection("emails").findOne({ _id: new ObjectId(id) });
}

/* Function to add a document to the database
 * @param name name of user
 * @param email email of user
 * @return result of operation
 */
export async function addEmail({ name, email }) {
  await client.connect();
  const db = client.db("email_list_app");

  return db.collection("emails").insertOne({ name, email });
}
