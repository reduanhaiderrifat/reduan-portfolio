"use client";
import Loading from "@/app/loading";
import usePublic from "@/hooks/usePublic";
import { Nosifer } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
const nosifer = Nosifer({ weight: ["400"], subsets: ["latin"] }); // Initialize the font
const ProjectDetails = ({ params }) => {
  const [loading, SetLoading] = useState(true);
  const axiosPublic = usePublic();
  const [project, setData] = useState({});
  const loadedData = async () => {
    if (params?.id) {
      try {
        // Fetch project details
        const res = await axiosPublic.get(`/project-details/api/${params.id}`);

        // Assuming setData expects the data directly, update it with the fetched result
        setData(res.data.result);
        SetLoading(false);
      } catch (error) {
        console.error("Failed to fetch project details:", error);
        SetLoading(true);
      }
    }
  };

  useEffect(() => {
    loadedData();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="text-white">
      <div className=" flex justify-center">
        <div
          className={`text-3xl font-bold mt-4 flex items-center gap-2 ${nosifer.className}`}
        >
          <p>Project</p> <p className="text-[#EF4444] ">{project?.title}</p>
        </div>
      </div>

      <div className="mt-4 mx-12 rounded-lg bg-[#1F2937] p-4">
        <h1 className="text-2xl font-semibold mb-8">{project?.title}</h1>

        <div className="flex flex-col space-y-4">
          <p>
            Project URL :{" "}
            <Link href={"#"} className="underline text-blue-400">
              {project?.liveLink}
            </Link>
          </p>
          <p>
            Client URL:{" "}
            <Link href={"#"} className="underline text-blue-400">
              {project?.githubLinkclient}
            </Link>
          </p>
          <p>
            Server URL:{" "}
            <Link href={"#"} className="underline text-blue-400">
              {project?.githubLinkserver}
            </Link>
          </p>
        </div>

        <p className="mt-6">{project?.content}</p>

        {/* Render skills list */}
        <div className="mt-8">
          <h2 className="text-xl font-bold">Technologies & Skills:</h2>
          <ul>
            {project?.selectedSkills?.map((skill, idx) => (
              <li key={idx} className="flex items-center gap-2 ">
                {" "}
                <p className="font-bold text-4xl ">.</p> {skill.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <p className="font-bold text-lg"> Start time:</p>{" "}
          <p className="font-medium"> {project?.startDate}</p>
        </div>
        <div className="flex items-center gap-3">
          <p className="font-bold text-lg"> Finish time:</p>
          <p className="font-medium"> {project?.finishDate}</p>
        </div>

        <div className="mt-4 flex justify-center">
          <Image
            src={project?.imgURL}
            alt="Project image"
            width={800}
            height={400}
            className="rounded-lg flex justify-center"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
