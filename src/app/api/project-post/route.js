import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const projectData = await request.json();
  try {
    const db = await connectDB();
    const projectClloection = db.collection("projects");

    const result = await projectClloection.insertOne(projectData);
    return NextResponse.json(
      { message: "Data Post successfully", result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Data Post  failed" }, { status: 500 });
  }
};
