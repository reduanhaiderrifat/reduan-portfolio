"use client";
import { FaArrowUpLong } from "react-icons/fa6";
import React, { useState, useEffect } from "react";
import "./style.css";
import Link from "next/link";
import { FaDownload } from "react-icons/fa";
import usePublic from "@/hooks/usePublic";
import { Nosifer } from "next/font/google";
const nosifer = Nosifer({ weight: ["400"], subsets: ["latin"] });
const LightSwitch = ({ section1Ref }) => {
  const axiosPublic = usePublic();
  const [isOn, setIsOn] = useState(false);
  const [audio, setAudio] = useState(null);
  const [resume, setResume] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const audioElement = document.getElementById("audio");
    setAudio(audioElement);
  }, []);

  const toggleLight = () => {
    setIsOn(!isOn);
    if (audio) {
      audio.play();
    }
  };

  const loadedResume = async () => {
    try {
      const res = await axiosPublic.get("/dashboard/api/gain-resume");

      setResume(res?.data);
    } catch (error) {
      console.error("Error fetching resume:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadedResume();
  }, []);

  return (
    <div ref={section1Ref} className={`${isOn ? "on" : ""}`}>
      <h1
        className={`text-white text-center pb-[80px] pt-2 lg:pb-0 text-4xl font-bold ${nosifer.className}`}
      >
        About Me
      </h1>
      <div className="light min-h-[600px] w-full flex flex-col justify-center items-center p-4">
        <div className="bulb"></div>

        <div
          className={`lg:w-4/5 transition-opacity duration-300 mb-24 lg:mb-0 ${
            isOn ? "opacity-100 text-white" : "opacity-0"
          }`}
        >
          <p className="text-2xl text-[#EF4444] font-bold ">About Me</p>
          <br /> As a highly motivated junior front-end web developer, I am
          passionate about creating engaging and user-friendly websites. With a
          solid foundation in HTML, CSS, and JavaScript, I am committed to
          designing creative websites that enhance user experience. My journey
          into web development started with a fascination for how websites work
          and a desire to create visually appealing and functional web pages. I
          excel in crafting intuitive user interfaces, ensuring websites are
          both functional and aesthetically pleasing. My attention to detail and
          user-centered design approach guarantee a consistent and enjoyable
          user experience. I am a strong communicator and team player,
          collaborating effectively with designers, back-end developers, and
          other stakeholders to bring projects to life. In addition to my
          technical skills, I have experience with frameworks like React and
          Vue.js, and I am proficient in using Git for version control. My
          dedication to continuous learning keeps me updated with the latest
          industry trends and technologies. My objective is to contribute to an
          organization digital success by leveraging my front-end development
          skills. I am eager to take on challenging projects in an innovative
          and expanding organization, allowing me to grow professionally and
          make a significant impact.
        </div>

        {isOn && !loading && resume?.length > 0 && (
          <Link href={resume[0]?.resumeLink} className="btn lg:mt-12">
            Download Resume <FaDownload />
          </Link>
        )}

        <div className="switch mb-8 lg:mb-0 relative" onClick={toggleLight}>
          <div className="btn "></div>
        </div>

        <h2 className="text-white text-right   bottom-4  right-7 absolute animate-bounce md:right-14 lg:bottom-0  ">
          Click Me
        </h2>
        <FaArrowUpLong
          size={24}
          className="text-white text-right bottom-12 right-9 absolute animate-bounce md:right-16 lg:bottom-6"
        />
      </div>
      <audio
        id="audio"
        src="/Button_click_sound___sound_effect(128k).m4a"
      ></audio>
    </div>
  );
};

export default LightSwitch;
