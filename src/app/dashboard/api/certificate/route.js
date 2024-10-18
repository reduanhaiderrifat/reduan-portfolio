import { connectDB } from "@/lib/connectDB";
import { verifyAdmin } from "@/lib/middleware";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { certificateLink } = await request.json();
    const currentDate = new Date();
    const db = await connectDB();
    const collection = db.collection("certificate");
    await verifyAdmin();

    const result = await collection.insertOne({ certificateLink, currentDate });

    return new NextResponse(
      JSON.stringify({ message: "Data posted", result }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Database insertion error:", error);

    return new NextResponse(JSON.stringify({ message: "Data post failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
