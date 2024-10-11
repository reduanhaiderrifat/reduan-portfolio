import { connectDB } from "./connectDB";

export async function getUserByEmail(email) {
  // Connect to the database

  const db = await connectDB();

  // Fetch the user document based on the email
  const user = await db.collection("users").findOne({ email });

  // Return the user document (which includes the role, email, etc.)
  return user;
}
