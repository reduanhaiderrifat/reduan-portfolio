import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const POST = async (request, { params }) => {
  const db = await connectDB();
  const postCollection = db.collection("projects");

  try {
    const {
      title,
      content,
      selectedSkills,
      startDate,
      finishDate,
      liveLink,
      githubLinkclient,
      githubLinkserver,
    } = await request.json();

    // Ensure the ID from params is a valid ObjectId
    const projectId = new ObjectId(params.id);

    // Update the document by its _id
    const result = await postCollection.updateOne(
      { _id: projectId }, // Filter to find the document by _id
      {
        $set: {
          title,
          content,
          selectedSkills,
          startDate,
          finishDate,
          liveLink,
          githubLinkclient,
          githubLinkserver,
        },
      } // Update operation
    );

    if (result.matchedCount === 0) {
      return new NextResponse(
        JSON.stringify({ message: "Project not found" }),
        {
          status: 404,
        }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Project updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating project:", error);
    return new NextResponse(
      JSON.stringify({ message: "Failed to update project" }),
      { status: 500 }
    );
  }
};
