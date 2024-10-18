import { connectDB } from "@/lib/connectDB";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
export const POST = async (request) => {
  const newUser = await request.json();
  try {
    const db = await connectDB();
    const useClloection = db.collection("users");
    const exist = await useClloection.findOne({
      $or: [{ email: newUser.email }, { uid: newUser.uid }],
    });
    if (exist) {
      if (exist.email === newUser.email) {
        return NextResponse.json(
          { message: "This email is already in use." },
          { status: 500 }
        );
      }
      if (exist.uid === newUser.uid) {
        return NextResponse.json({ message: "This UID is already in use." });
      }
    }
    const hash = bcrypt.hashSync(newUser.password, 14);
    const result = await useClloection.insertOne({
      ...newUser,
      password: hash,
    });
    return NextResponse.json(
      { message: "User created successfully", result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "User created failed" },
      { status: 500 }
    );
  }
};
