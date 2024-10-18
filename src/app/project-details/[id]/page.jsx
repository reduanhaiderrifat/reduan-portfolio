"use client";
import Loading from "@/app/loading";
import usePublic from "@/hooks/usePublic";
import { Nosifer } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
const nosifer = Nosifer({ weight: ["400"], subsets: ["latin"] });
const ProjectDetails = ({ params }) => {
  const [loading, SetLoading] = useState(true);
  const axiosPublic = usePublic();
  const [project, setData] = useState({});
  const loadedData = async () => {
    if (params?.id) {
      try {
        const res = await axiosPublic.get(`/project-details/api/${params.id}`);

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
      <div className="flex justify-center">
        <div
          className={`lg:text-3xl font-bold mt-4 flex items-center gap-2 ${nosifer.className}`}
        >
          <p>Project</p> <p className="text-[#EF4444] ">{project?.title}</p>
        </div>
      </div>

      <div className="mt-4 mx-2 lg:mx-12 rounded-lg bg-[#1F2937] p-4">
        <h1 className="text-2xl font-semibold mb-8">{project?.title}</h1>

        <div className="flex flex-col space-y-4">
          <p>
            Project URL :{" "}
            <Link
              target="_blank"
              href={project?.liveLink}
              className="underline text-blue-400 break-all"
            >
              {project?.liveLink}
            </Link>
          </p>
          <p>
            Client URL:{" "}
            <Link
              target="_blank"
              href={project?.githubLinkclient}
              className="underline text-blue-400 break-all"
            >
              {project?.githubLinkclient}
            </Link>
          </p>
          <p>
            Server URL:{" "}
            <Link
              target="_blank"
              href={project?.githubLinkserver}
              className="underline text-blue-400 break-all"
            >
              {project?.githubLinkserver}
            </Link>
          </p>
        </div>

        <p className="mt-6">{project?.content}</p>

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
