"use client";
import usePublic from "@/hooks/usePublic";
import { Nosifer } from "next/font/google";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import CustomToast from "../shared/CustomToast";
import { toast } from "react-toastify";
import ErrorToast from "../shared/ErrorToast";

const nosifer = Nosifer({ weight: ["400"], subsets: ["latin"] }); // Initialize the font

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
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "php", label: "PHP" },
  { value: "python", label: "Python" },
  { value: "ruby", label: "Ruby" },
  { value: "django", label: "Django" },
  { value: "flask", label: "Flask" },
  { value: "jest", label: "Jest" },
  { value: "mocha", label: "Mocha" },
  { value: "eslint", label: "ESLint" },
  { value: "prettier", label: "Prettier" },
  { value: "npm", label: "NPM" },
  { value: "yarn", label: "Yarn" },
  { value: "pwa", label: "Progressive Web Apps" },
  { value: "websockets", label: "WebSockets" },
  { value: "docker", label: "Docker" },
  { value: "kubernetes", label: "Kubernetes" },
  { value: "oauth", label: "OAuth" },
  { value: "heroku", label: "Heroku" },
  { value: "aws", label: "AWS" },
  { value: "azure", label: "Azure" },
  { value: "netlify", label: "Netlify" },
  { value: "vercel", label: "Vercel" },
  { value: "serviceworkers", label: "Service Workers" },
  { value: "chartjs", label: "Chart.js" },
  { value: "d3", label: "D3.js" },
  { value: "mysql", label: "MySQL" },
  { value: "postgresql", label: "PostgreSQL" },
  { value: "sqlite", label: "SQLite" },
  { value: "redis", label: "Redis" },
  { value: "mariadb", label: "MariaDB" },
  { value: "cassandra", label: "Cassandra" },
  { value: "dynamodb", label: "DynamoDB" },
  { value: "express", label: "Express" },
  { value: "cors", label: "CORS" },
];

const imageHosting = "970729383cc876912156a6a779cb1b9f";
const imageHOstingApi = `https://api.imgbb.com/1/upload?&key=${imageHosting}`;

const ProjectPost = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ongoing, setOngoing] = useState(false); // State for ongoing project
  const axiosPublic = usePublic();

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
      title,
      githubLinkserver,
      githubLinkclient,
      content,
      liveLink,
      selectedSkills,
      imgURL,
      startDate,
      finishDate: ongoing ? "Ongoing" : finishDate,
    };

    try {
      const res = await axiosPublic.post("/api/project-post", info);
      if (res.data.result.acknowledged === true) {
        setLoading(false);
        reset();
        toast(
          <CustomToast title="Success!" message="Project post successfully" />,
          {
            autoClose: false, // Disable auto-close
            closeOnClick: true,
            draggable: true,
            progress: undefined, // Stop the progress bar
            className: "border-2 border-white",
            theme: "dark", // Set theme to dark
          }
        );
      }
    } catch (error) {
      toast(<ErrorToast title="Error!" message="Project POst Failed." />, {
        autoClose: false, // Disable auto-close
        closeOnClick: true,
        draggable: true,
        progress: undefined, // Stop the progress bar
        className: "border-2 border-red-500 ", // Add border and styling for error
        theme: "dark", // Set theme to dark
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
            className="input input-bordered"
            {...register("title", { required: true })}
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
            className="input input-bordered"
            {...register("startDate", { required: true })}
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
            disabled={ongoing} // Disable if the project is ongoing
            {...register("finishDate", { required: !ongoing })}
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
            type="url"
            placeholder="Project Live Link"
            className="input input-bordered"
            {...register("liveLink", { required: true })}
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
            type="url"
            placeholder="Project GitHub Link"
            className="input input-bordered"
            {...register("githubLinkclient", { required: true })}
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
            type="url"
            placeholder="Project GitHub Link"
            className="input input-bordered"
            {...register("githubLinkserver", { required: true })}
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
            {...register("image", { required: true })}
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
            className="textarea textarea-bordered"
            {...register("content", { required: true })}
          />
          {errors.content && (
            <p className="text-red-500">This field is required</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="form-control mt-6">
          <button disabled={loading} className="btn btn-primary mb-2">
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectPost;
