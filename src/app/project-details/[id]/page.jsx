"use client";
import usePublic from "@/hooks/usePublic";
import { Nosifer } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
const nosifer = Nosifer({ weight: ["400"], subsets: ["latin"] }); // Initialize the font
const ProjectDetails = ({ params }) => {
  const axiosPublic = usePublic();
  const [project, setData] = useState({});
  const loadedData = async () => {
    if (params?.id) {
      try {
        // Fetch project details
        const res = await axiosPublic.get(`/project-details/api/${params.id}`);

        // Assuming setData expects the data directly, update it with the fetched result
        setData(res.data.result);
      } catch (error) {
        console.error("Failed to fetch project details:", error);
      }
    }
  };

  console.log(project);
  useEffect(() => {
    loadedData();
  }, []);
  return (
    <div className="text-white">
      <div className=" flex justify-center">
        <h1 className={`text-3xl font-bold mt-4 ${nosifer.className}`}>
          Project <span className="text-[#EF4444] ">{project?.title}</span>
        </h1>
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
              <li key={idx}>
                {" "}
                <soan className="font-bold text-4xl">.</soan> {skill.label}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-4">
          <span className="font-bold text-lg"> Start time:</span>{" "}
          <span className="font-medium"> {project?.startDate}</span>
        </p>
        <p>
          <span className="font-bold text-lg"> Finish time:</span>
          <span className="font-medium"> {project?.finishDate}</span>
        </p>

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
