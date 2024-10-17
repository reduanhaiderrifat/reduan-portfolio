import { getServerSession } from "next-auth";
import { connectDB } from "./connectDB";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const verifyAdmin = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session?.user?.email) {
    throw new Error("Access denied: Not authenticated");
  }
  const db = await connectDB();
  const usersCollection = db.collection("users");

  const user = await usersCollection.findOne({ email: session.user.email });
  if (!user || user.role !== "admin") {
    throw new Error("Access denied: You are not authorized as admin.");
  }
  return true;
};
