import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { resumeLink } = await request.json(); // Awaiting the JSON parsing
  const currentDate = new Date(); // Get the current date
  const db = await connectDB();
  const collection = db.collection("resume");

  try {
    const result = await collection.insertOne({ resumeLink, currentDate }); // Wrap resumeLink in an object
    return new NextResponse(
      JSON.stringify({ message: "Data posted", result }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    ); // Corrected NextResponse
  } catch (error) {
    console.error("Database insertion error:", error); // Log error for debugging
    return new NextResponse(JSON.stringify({ message: "Data post failed" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    }); // Corrected Response
  }
};
