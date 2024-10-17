"use client";

import React, { useState, useEffect } from "react";
import "./style.css"; // Import custom CSS here
import Link from "next/link";
import { FaDownload } from "react-icons/fa";
import usePublic from "@/hooks/usePublic";

const LightSwitch = ({ section1Ref }) => {
  const axiosPublic = usePublic();
  const [isOn, setIsOn] = useState(false); // State to toggle light
  const [audio, setAudio] = useState(null); // State for audio
  const [resume, setResume] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const audioElement = document.getElementById("audio");
    setAudio(audioElement);
  }, []);

  const toggleLight = () => {
    setIsOn(!isOn);
    if (audio) {
      audio.play(); // Play the click sound
    }
  };

  const loadedResume = async () => {
    try {
      const res = await axiosPublic.get("/dashboard/api/gain-resume");

      setResume(res?.data);
    } catch (error) {
      console.error("Error fetching resume:", error); // Log the error
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  useEffect(() => {
    loadedResume();
  }, []);

  return (
    <div ref={section1Ref} className={`${isOn ? "on" : ""}`}>
      <div className="light min-h-[600px] w-full flex flex-col justify-center items-center p-4">
        <div className="bulb">
          {/* <span></span>
          <span></span> */}
        </div>

        {/* Paragraph with opacity based on isOn state */}
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

        {/* Conditionally render the button based on isOn state and loading status */}
        {isOn &&
          !loading &&
          resume?.length > 0 && ( // Check if there is at least one resume
            <Link href={resume[0]?.resumeLink} className="btn ">
              Download Resume <FaDownload />
            </Link>
          )}

        <div className="switch mb-8 lg:mb-0" onClick={toggleLight}>
          <div className="btn"></div>
        </div>
      </div>
      <audio
        id="audio"
        src="/Button_click_sound___sound_effect(128k).m4a"
      ></audio>
    </div>
  );
};

export default LightSwitch;
