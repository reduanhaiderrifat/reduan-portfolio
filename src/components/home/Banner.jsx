"use client";
import { RiNextjsLine, RiTailwindCssFill } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import "./style.css"; // Ensure your styles are imported here
import {
  FaFacebookF,
  FaGithub,
  FaLinkedin,
  FaReact,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { DiMongodb } from "react-icons/di";
import { MdAddIcCall, MdAttachEmail } from "react-icons/md";
import Link from "next/link";

const Banner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300); // Delay for 300ms
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleMouseMove = (e) => {
        const banner = document.querySelector(".banner-container");
        const heart = document.createElement("span");
        const x = e.pageX - banner.offsetLeft; // Position relative to the banner
        const y = e.pageY - banner.offsetTop; // Position relative to the banner

        heart.style.left = x - 10 + "px"; // Adjust based on heart size
        heart.style.top = y - 10 + "px"; // Adjust based on heart size
        banner.appendChild(heart);

        // Randomly rotate the heart
        const transformValue = Math.random() * 360;
        heart.style.transform = "rotate(" + transformValue + "deg)";

        // Set random size for the heart
        const size = Math.random() * 50; // Random size up to 50px
        heart.style.width = 20 + size + "px"; // Set width
        heart.style.height = 20 + size + "px"; // Set height

        // Remove the heart after 1 second
        setTimeout(() => {
          heart.remove();
        }, 1000);
      };

      const banner = document.querySelector(".banner-container");
      banner.addEventListener("mousemove", handleMouseMove);
      return () => {
        banner.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  return (
    <div className="banner-container min-h-[calc(100vh-236px)] flex justify-center relative bg-gray-900 text-white overflow-hidden">
      <div className="hero-content text-center mb-4 z-10">
        <div
          className={`transition-opacity duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-xl mb-2">Hello, it is me!</p>
          <h1 className="text-6xl font-bold mb-2 ">Reduan Haider Rifat</h1>
          <div className="text-3xl font-bold  mb-4">
            And I am <p className=" text-red-500"> Junior Web Developer</p>
          </div>
          <p className="py-4 text-gray-300 max-w-md mx-auto">
            Motivated junior developer skilled in HTML, CSS, and JavaScript,
            eager to design user-friendly websites and contribute to an
            innovative of organization success.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              className="hover:border p-2 hover:rounded-full"
              href={"https://www.facebook.com/bosonterrifat"}
              target="_blank"
            >
              <FaFacebookF size={25} />
            </Link>
            <Link
              className="hover:border p-2 hover:rounded-full"
              href={"https://www.linkedin.com/in/rifat-nxt"}
              target="_blank"
            >
              <FaLinkedin size={25} />
            </Link>
            <Link
              className="hover:border p-2 hover:rounded-full"
              href={"https://x.com/reduan_rifat77"}
              target="_blank"
            >
              <FaTwitter size={25} />
            </Link>
            <Link
              className="hover:border p-2 hover:rounded-full"
              href={"https://github.com/reduanhaiderrifat"}
              target="_blank"
            >
              <FaGithub size={25} />
            </Link>
            <Link
              className="hover:border p-2 hover:rounded-full"
              href={"mailto:reduanhaiderrifat@gmail.com"}
              target="_blank"
            >
              <MdAttachEmail size={25} />
            </Link>
            <Link
              className="hover:border p-2 hover:rounded-full"
              href={"tel:+8801537140067"}
              target="_blank"
            >
              <MdAddIcCall size={25} />
            </Link>
            <Link
              className="hover:border p-2 hover:rounded-full"
              href={"https://www.youtube.com/@rifat-nxt"}
              target="_blank"
            >
              <FaYoutube size={25} />
            </Link>
          </div>
        </div>
      </div>{" "}
      {/* Animating icons */}
      <FaReact
        className="absolute text-white left-[20%] animate-spin text-glowing top-[30%]"
        size={50}
      />
      <RiTailwindCssFill
        className="absolute text-white left-[20%] rotate-animation top-[60%]"
        size={50}
      />
      <RiNextjsLine
        className="absolute text-white right-[20%] animate-ping top-[60%]"
        size={50}
      />
      <DiMongodb
        className="absolute text-white right-[20%] animate-pulse top-[30%]"
        size={50}
      />
    </div>
  );
};

export default Banner;
