import { connectDB } from "@/lib/connectDB";
import { verifyAdmin } from "@/lib/middleware";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { certificateLink } = await request.json(); // Awaiting JSON parsing
    const currentDate = new Date(); // Create current date
    const db = await connectDB(); // Connect to the database
    const collection = db.collection("certificate");
    await verifyAdmin();
    // Insert certificate link and current date into the collection
    const result = await collection.insertOne({ certificateLink, currentDate });

    // Return success response with the result
    return new NextResponse(
      JSON.stringify({ message: "Data posted", result }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Database insertion error:", error); // Log error for debugging

    // Return error NextResponse
    return new NextResponse(JSON.stringify({ message: "Data post failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
