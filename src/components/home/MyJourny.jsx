"use client";
import usePublic from "@/hooks/usePublic";
import { Nosifer } from "next/font/google";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { TbDeviceImacSearch } from "react-icons/tb";
const nosifer = Nosifer({ weight: ["400"], subsets: ["latin"] }); // Initialize the font
const MyJourny = () => {
  const axiosPublic = usePublic();
  const [certificate, setCertificate] = useState([]);

  const loadedCertificate = async () => {
    try {
      const res = await axiosPublic.get("/dashboard/api/gain-certificate");

      setCertificate(res?.data);
    } catch (error) {
      console.error("Error fetching resume:", error); // Log the error
    }
  };

  useEffect(() => {
    loadedCertificate();
  }, []);
  return (
    <div className="my-24 overflow-hidden  py-12">
      <div className=" text-white">
        <h2 className={`text-4xl ${nosifer.className} flex justify-center`}>
          My Journey
        </h2>

        <div className="flex justify-between gap-8 mt-4 ">
          <div className=" w-1/2">
            <h2 className="text-2xl text-center">Education</h2>
            <div className="border py-2 px-4 mt-9 hover:scale-105 transition-all hover:shadow-xl hover:shadow-white">
              <p className="flex items-center gap-1 ">
                <MdDateRange /> 01 January 2024 - 30 June 2024
              </p>
              <h1 className="text-xl space-y-2 font-bold">Programming Hero</h1>
              <p className="text-sm">Fresher Mern Stack Developer</p>
            </div>
            <div className="border py-2 px-4 my-4 hover:scale-105 transition-all hover:shadow-xl hover:shadow-white">
              <p className="flex items-center gap-1 ">
                <MdDateRange />
                2023 - Present
              </p>
              <h1 className="text-xl space-y-2 font-bold">
                Carmaicheal College, Rangpur
              </h1>
              <p>Honours 1st year in English</p>
              <p className="text-sm">
                Honours 1st year in English From the beginning the college was
                under Calcutta University. It is then nationalized on 1 July
                1963. Then in 1992, it came under Bangladesh National
                University.
              </p>
            </div>
            <div className="border py-2 px-4 hover:scale-105 transition-all hover:shadow-xl hover:shadow-white">
              <p className="flex items-center gap-1 ">
                <MdDateRange />
                2020 - 2022
              </p>
              <h1 className="text-xl space-y-2 font-bold">
                Carmaicheal College, Rangpur
              </h1>
              <div className="flex justify-between">
                <p>HSC in Humanities</p> <p>GPA = 5.00</p>
              </div>
              <p className="text-sm">
                From the beginning the college was under Calcutta University. It
                is then nationalized on 1 July 1963. Then in 1992, it came under
                Bangladesh National University.
              </p>
            </div>
          </div>
          <div className=" w-1/2">
            <h2 className="text-2xl text-center">Experience</h2>
            <div className="text-center border mt-9 py-4 hover:scale-105 transition-all hover:shadow-xl hover:shadow-white">
              <h1 className="flex items-center justify-center text-2xl font-semibold gap-2">
                <TbDeviceImacSearch size={25} /> Looking for Frontend Web
                Developer Jobs
              </h1>{" "}
              <p>No company experience yet</p>
            </div>
            <div className="">
              {certificate.length > 0 ? (
                <Link
                  href={certificate[0]?.certificateLink} // Set the link to the first certificate
                  className="btn mt-4 border bg-transparent text-white hover:bg-white hover:text-black"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Certificate <FaLongArrowAltRight />
                </Link>
              ) : (
                <button className="btn mt-4 border bg-transparent text-white hover:bg-white hover:text-black">
                  No Certificate Available
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyJourny;
