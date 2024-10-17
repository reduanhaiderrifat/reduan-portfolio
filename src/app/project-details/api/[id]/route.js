import { connectDB } from "@/lib/connectDB";
import { verifyAdmin } from "@/lib/middleware";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  console.log("ID I want for data:", params.id);

  const db = await connectDB();
  const projectCollection = db.collection("projects");

  try {
    const result = await projectCollection.findOne({
      _id: new ObjectId(params.id),
    });

    // Check if the result is null or undefined
    if (!result) {
      console.log("No project found with ID:", params.id);
      return new NextResponse(
        JSON.stringify({ message: "Project not found" }),
        {
          status: 404,
        }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Data fetched successfully", result }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return new NextResponse(JSON.stringify({ message: "Data fetch failed" }), {
      status: 500,
    });
  }
};

export const DELETE = async (request, { params }) => {
  const db = await connectDB();
  const projectCollection = db.collection("projects");
  await verifyAdmin();
  try {
    const result = await projectCollection.deleteOne({
      _id: new ObjectId(params.id),
    });
    if (result.deletedCount === 0) {
      return new NextResponse(
        JSON.stringify({ message: "Project not found" }),
        {
          status: 404,
        }
      );
    }
    return new NextResponse(
      JSON.stringify({ message: "Project deleted successfully", result }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Data Delete failed" }), {
      status: 500,
    });
  }
};
