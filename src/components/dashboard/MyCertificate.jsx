"use client";
import usePublic from "@/hooks/usePublic";
import React from "react";
import CustomToast from "../shared/CustomToast";
import { toast } from "react-toastify";

const MyCertificate = () => {
  const axiosPublic = usePublic();
  const handleSubmitLink1 = async (e) => {
    e.preventDefault();
    const resumeLink = e.target.resume.value;

    const res = await axiosPublic.post("/dashboard/api/resume", { resumeLink });
    if (res.status === 200) {
      toast(
        <CustomToast title="Success!" message="Resume Post successfully" />,
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
    if (res.status !== 200) {
      console.error("Data Fetch Failed");
    }

    e.target.reset();
  };

  const handleSubmitLink2 = async (e) => {
    e.preventDefault();
    const certificateLink = e.target.certificate.value;

    const res = await axiosPublic.post("/dashboard/api/certificate", {
      certificateLink,
    });
    if (res.status === 200) {
      toast(
        <CustomToast
          title="Success!"
          message="Certificate Post successfully"
        />,
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
    if (res.status !== 200) {
      console.error("Data Fetch Failed");
    }

    e.target.reset();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Submit Your Certificates</h2>

      {/* Form for Certificate Link 1 */}
      <form onSubmit={handleSubmitLink1} className="mb-4">
        <label htmlFor="resume" className="block mb-1">
          Certificate Link 1:
        </label>
        <input
          type="url"
          name="resume"
          id="resume"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Enter your resume link 1"
          required
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit Link 1
        </button>
      </form>

      {/* Form for Certificate Link 2 */}
      <form onSubmit={handleSubmitLink2}>
        <label htmlFor="certificate" className="block mb-1">
          Certificate Link 2:
        </label>
        <input
          type="url"
          name="certificate"
          id="certificate"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Enter your certificate link 2"
          required
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit Link 2
        </button>
      </form>
    </div>
  );
};

export default MyCertificate;
