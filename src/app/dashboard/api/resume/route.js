import { connectDB } from "@/lib/connectDB";
import { verifyAdmin } from "@/lib/middleware";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { resumeLink } = await request.json();
  const currentDate = new Date();
  const db = await connectDB();
  const collection = db.collection("resume");
  await verifyAdmin();
  try {
    const result = await collection.insertOne({ resumeLink, currentDate });
    return new NextResponse(
      JSON.stringify({ message: "Data posted", result }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Data post failed" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
