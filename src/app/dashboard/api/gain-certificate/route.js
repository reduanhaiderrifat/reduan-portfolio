import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  const db = await connectDB();
  const collection = db.collection("certificate");

  try {
    const result = await collection.find().sort({ currentDate: -1 }).toArray();

    return new NextResponse(JSON.stringify(result), {
      message: "data fetch success",
    });
  } catch (error) {
    console.error("Data fetch error:", error);
    return new NextResponse(
      JSON.stringify({ message: "Data fetch failed", error: error.message }),
      {
        status: 500,
      }
    );
  }
};
