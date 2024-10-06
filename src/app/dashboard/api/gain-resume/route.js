import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  const db = await connectDB();
  const collection = db.collection("resume");

  try {
    // Fetch and sort documents by the 'submittedAt' field in descending order (newest first)
    const result = await collection.find().sort({ currentDate: -1 }).toArray(); // Ensure the field name is correct

    // Return a JSON response
    return new NextResponse(JSON.stringify(result), {
      message: "data fetch success",
    });
  } catch (error) {
    console.error("Data fetch error:", error); // Log error for debugging
    return new NextResponse(
      JSON.stringify({ message: "Data fetch failed", error: error.message }),
      {
        status: 500,
      }
    );
  }
};
