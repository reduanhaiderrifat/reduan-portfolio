// src/pages/api/getUser.js
import { connectDB } from "@/lib/connectDB";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { email } = req.query; // Get email from query parameters

    // Connect to the database
    const db = await connectDB();
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
