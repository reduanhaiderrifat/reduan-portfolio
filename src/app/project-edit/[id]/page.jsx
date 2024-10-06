"use client";
import usePublic from "@/hooks/usePublic";
import { Nosifer } from "next/font/google";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";

import Notify from "simple-notify";
const nosifer = Nosifer({ weight: ["400"], subsets: ["latin"] }); // Initialize the font

const imageHosting = "970729383cc876912156a6a779cb1b9f";
const imageHOstingApi = `https://api.imgbb.com/1/upload?&key=${imageHosting}`;
const ProjectEdit = ({ params }) => {
  const axiosPublic = usePublic();
  const [selectedSkills, setSelectedSkills] = useState([]);

  const [loading, setLoading] = useState(false);
  const [ongoing, setOngoing] = useState(false);
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

  const handleSkillsChange = (selectedOption) => {
    setSelectedSkills(selectedOption);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", data.image[0]);
    const imgRes = await axiosPublic.post(imageHOstingApi, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const imgData = imgRes.data;
    const imgURL = imgData.data.url;

    const {
      title,
      liveLink,
      githubLinkserver,
      githubLinkclient,
      content,
      startDate,
      finishDate,
    } = data;
    const info = {
      title: title || project.title,
      githubLinkserver: githubLinkserver || project.githubLinkserver,
      githubLinkclient: githubLinkclient || project.githubLinkclient,
      content: content || project.content,
      liveLink: liveLink || project.liveLink,
      selectedSkills: selectedSkills || project.selectedSkills,
      imgURL: imgURL || project.imgURL,
      startDate: startDate || project.startDate,
      finishDate: ongoing ? "Ongoing" : finishDate || project.finishDate,
    };

    try {
      const res = await axiosPublic.post(
        `project-edit/api/${params?.id}`,
        info
      );
      console.log(res);
      if (res.data.status === 200) {
        setLoading(false);
        reset();
        new Notify({
          title: "Data Post",
          text: "Your data successfully update in MongoDB.",
          status: "success",
          autoclose: false,
          position: "bottom right",
          effect: "slide",
        });
      }
    } catch (error) {
      new Notify({
        title: "Data Post Error",
        text: "Your data was not update in MongoDB.",
        status: "error",
        autoclose: false,
        position: "bottom right",
        effect: "slide",
      });
    }
  };
  return (
    <div className="mx-12">
      <div className="flex items-center justify-center my-6">
        <h2 className={`text-4xl text-white ${nosifer.className}`}>Project</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {/* Project Title */}
        <div className="form-control mb-4">
          <label className="label">
            <p className="label-text text-white">Project Name</p>
          </label>
          <input
            type="text"
            placeholder="Project Name"
            defaultValue={project?.title}
            className="input input-bordered"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500">This field is required</p>
          )}
        </div>

        {/* Start Date */}
        <div className="form-control mb-4">
          <label className="label">
            <p className="label-text text-white">Start Date</p>
          </label>
          <input
            type="date"
            defaultValue={project?.startDate}
            className="input input-bordered"
            {...register("startDate")}
          />
          {errors.startDate && (
            <p className="text-red-500">This field is required</p>
          )}
        </div>

        {/* Finish Date */}
        <div className="form-control mb-4">
          <label className="label">
            <p className="label-text text-white">Finish Date</p>
          </label>
          <input
            type="date"
            className="input input-bordered"
            defaultValue={project?.finishDate}
            disabled={ongoing} // Disable if the project is ongoing
            {...register("finishDate")}
          />
          {errors.finishDate && !ongoing && (
            <p className="text-red-500">This field is required</p>
          )}
        </div>

        {/* Ongoing Checkbox */}
        <div className="form-control mb-4 ">
          <label className="label cursor-pointer flex items-center">
            <input
              type="checkbox"
              className="checkbox"
              onChange={(e) => setOngoing(e.target.checked)} // Update ongoing state
            />
            <p className=" text-white">Ongoing Project</p>
          </label>
        </div>

        {/* Other Fields */}
        <div className="form-control mb-4">
          <label className="label">
            <p className="label-text text-white">Project Live Link</p>
          </label>
          <input
            type="text"
            placeholder="Project Live Link"
            className="input input-bordered"
            defaultValue={project?.liveLink}
            {...register("liveLink")}
          />
          {errors.liveLink && (
            <p className="text-red-500">This field is required</p>
          )}
        </div>

        {/* Project GitHub Links */}
        <div className="form-control mb-4">
          <label className="label">
            <p className="label-text text-white">Project GitHub Client Link</p>
          </label>
          <input
            type="text"
            placeholder="Project GitHub Link"
            defaultValue={project?.githubLinkclient}
            className="input input-bordered"
            {...register("githubLinkclient")}
          />
          {errors.githubLinkclient && (
            <p className="text-red-500">This field is required</p>
          )}
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <p className="label-text text-white">Project GitHub Server Link</p>
          </label>
          <input
            type="text"
            placeholder="Project GitHub Link"
            defaultValue={project?.githubLinkserver}
            className="input input-bordered"
            {...register("githubLinkserver")}
          />
          {errors.githubLinkserver && (
            <p className="text-red-500">This field is required</p>
          )}
        </div>

        {/* Image Upload */}
        <div className="form-control mb-4">
          <label className="label">
            <p className="label-text text-white">Project Image</p>
          </label>
          <input
            type="file"
            placeholder="Image"
            className="input input-bordered"
            {...register("image")}
          />
          {errors.image && (
            <p className="text-red-500">This field is required</p>
          )}
        </div>

        {/* Skills Select */}
        <div className="form-control mb-4">
          <label className="label">
            <p className="label-text text-white">Skills</p>
          </label>
          <Select
            isMulti
            options={skillsOptions}
            onChange={handleSkillsChange}
            defaultValue={project?.selectedSkills}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select skills..."
          />
        </div>

        {/* Content */}
        <div className="form-control mb-4">
          <label className="label">
            <p className="label-text text-white">Project Content</p>
          </label>
          <textarea
            rows={5}
            placeholder="Content"
            defaultValue={project?.content}
            className="textarea textarea-bordered"
            {...register("content")}
          />
          {errors.content && (
            <p className="text-red-500">This field is required</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="form-control mt-6">
          <button className="btn btn-primary mb-2">
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

const skillsOptions = [
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "javascript", label: "JavaScript" },
  { value: "react", label: "React" },
  { value: "node", label: "Node.js" },
  { value: "mongodb", label: "MongoDB" },
  { value: "jsonwebtoken", label: "JWT" },
  { value: "tailwind", label: "Tailwind CSS" },
  { value: "nextjs", label: "Next.js" },
  { value: "firebase", label: "Firebase" },
  { value: "github", label: "GitHub" },
  { value: "git", label: "Git" },
  { value: "graphql", label: "GraphQL" },
  { value: "typescript", label: "TypeScript" },
  { value: "sass", label: "Sass" },
  { value: "bootstrap", label: "Bootstrap" },
  { value: "jquery", label: "jQuery" },
  { value: "webpack", label: "Webpack" },
  { value: "babel", label: "Babel" },
  { value: "express", label: "Express" },
  { value: "css3", label: "CSS3" },
  { value: "restapi", label: "REST API" },
  // Add more skills as needed
];

export default ProjectEdit;
