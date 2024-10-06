import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const db = await connectDB();
    const projectClloection = db.collection("projects");

    const result = await projectClloection.find().toArray();
    return NextResponse.json(
      { message: "Data fetch successfully", result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Data fetch failed" }, { status: 500 });
  }
};
