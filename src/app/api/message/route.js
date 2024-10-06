import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const messageData = await request.json();
  const db = await connectDB();
  const messageCollection = db.collection("message");
  try {
    const message = await messageCollection.insertOne(messageData);
    return NextResponse.json(
      { message: "Message sent successfully", message },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Message sent wrong" },
      { status: 500 }
    );
  }
};
