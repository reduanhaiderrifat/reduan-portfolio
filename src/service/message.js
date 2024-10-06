import { connectDB } from "@/lib/connectDB";

export const POST = async (request) => {
  const messageData = await request.json();
  const db = await connectDB();
  const messageCollection = db.collection("message");
  try {
    const message = await messageCollection.insertOne(messageData);
    return Response.json(
      { message: "Message sent successfully", message },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: "Message sent wrong" }, { status: 500 });
  }
};
