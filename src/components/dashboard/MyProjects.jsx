"use client";
import usePublic from "@/hooks/usePublic";
import { Nosifer } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "simple-notify/dist/simple-notify.css";
import React, { useEffect, useState } from "react";
import Notify from "simple-notify";
import { FaArrowRightLong } from "react-icons/fa6";
import { useSession } from "next-auth/react";
const nosifer = Nosifer({ weight: ["400"], subsets: ["latin"] }); // Initialize the font
const MyProjects = () => {
  const axiosPublic = usePublic();
  const [role, setRole] = useState({});
  const [projects, setProject] = useState([]);
  const session = useSession();
  const email = session?.data?.user?.email;
  useEffect(() => {
    if (email) {
      axiosPublic
        .post(`/api/user-get`, { email })
        .then((response) => {
          setRole(response.data); // Assuming response.data contains the role
        })
        .catch((error) => {
          console.error("Error fetching user role:", error);
        });
    }
  }, [axiosPublic, email]);

  const loadedData = async () => {
    const res = await axiosPublic.get("/api/get-all-project");
    setProject(res?.data?.result);
  };

  useEffect(() => {
    loadedData();
  }, [axiosPublic]);

  const handleDelete = async (id) => {
    const res = await axiosPublic.delete(`/project-details/api/${id}`);
    if (res.status === 200) {
      new Notify({
        title: "Delete success",
        text: "Delete success.",
        status: "success",
        autoclose: false,
        position: "bottom right",
        effect: "slide",
      });
    } else {
      new Notify({
        title: "Login Failed",
        text: "Delete can not success.",
        status: "error",
        autoclose: false,
        position: "bottom right",
        effect: "slide",
      });
    }
  };
  return (
    <div>
      <div className="flex justify-center mt-12">
        <h1 className={`text-white text-4xl ${nosifer.className}`}>
          My Projects
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {projects?.map((project) => (
          <div
            key={project._id}
            className="bg-[#1F2937] rounded-lg shadow-lg overflow-hidden"
          >
            {/* Project Header */}
            <div className="p-4   text-white">
              <Link
                className="text-xl text-[#EF4444] font-bold"
                href={project?.liveLink}
              >
                {project?.title}
              </Link>
            </div>

            {/* Project Image */}
            <Image
              src={project?.imgURL}
              alt="Project image"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />

            {/* Project Footer */}
            <div className="p-4 flex justify-between items-center">
              <Link
                href={`/project-details/${project?._id}`}
                className="px-4 py-2 bg-transparent flex gap-1 items-center text-[#EF4444] font-semibold border rounded-md hover:bg-transparent"
              >
                Details <FaArrowRightLong />
              </Link>
              {role?.user?.role === "admin" && (
                <button
                  onClick={() => handleDelete(project?._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              )}

              <Link
                href={project?.githubLinkclient}
                className="px-4 py-2 bg-transparent border text-white rounded-md hover:bg-transparent"
              >
                Git
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProjects;
