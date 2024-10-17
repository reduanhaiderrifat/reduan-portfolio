import { Nosifer } from "next/font/google";
import React from "react";
import Marquee from "react-fast-marquee";
import { IoLogoFirebase } from "react-icons/io5";
import { FaHtml5, FaNodeJs, FaReact } from "react-icons/fa";
import { SiJsonwebtokens } from "react-icons/si";
import { SiCss3 } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { RiNextjsLine, RiTailwindCssLine } from "react-icons/ri";
import { TbBrandJavascript } from "react-icons/tb";
const nosifer = Nosifer({ weight: ["400"], subsets: ["latin"] }); // Initialize the font
const MySkills = ({ section2Ref }) => {
  return (
    <div ref={section2Ref} className="mt-24">
      <div className="flex justify-center text-white ">
        <h1 className={`text-4xl font-bold py-12 ${nosifer.className}`}>
          My Skils
        </h1>
      </div>
      <Marquee>
        <div className="flex items-center gap-9 text-white">
          <div className="">
            <FaReact size={90} /> <p>React</p>
          </div>
          <div className="">
            <RiNextjsLine size={90} /> <p>Next.js</p>
          </div>
          <div className="">
            <FaNodeJs size={90} /> <p>Node.js</p>
          </div>
          <div className="">
            <SiJsonwebtokens size={90} /> <p>Jsonwebtoken</p>
          </div>
          <div className="">
            <IoLogoFirebase size={90} /> <p>Firebase</p>
          </div>
          <div className="">
            <SiMongodb size={90} /> <p>MongoDB</p>
          </div>
          <div className="">
            <RiTailwindCssLine size={90} /> <p>Tailwind Css</p>
          </div>
          <div className="">
            <TbBrandJavascript size={90} />
            <p>Javascript</p>
          </div>
          <div className="">
            <SiCss3 size={90} /> <p>CSS3</p>
          </div>
          <div className="">
            <FaHtml5 size={90} /> <p>HTML5</p>
          </div>
        </div>
      </Marquee>
      <Marquee className="mt-14" direction={"right"}>
        <div className="flex items-center gap-9 text-white">
          <div className="">
            <FaReact size={90} /> <p>React</p>
          </div>
          <div className="">
            <RiNextjsLine size={90} /> <p>Next.js</p>
          </div>
          <div className="">
            <FaNodeJs size={90} /> <p>Node.js</p>
          </div>
          <div className="">
            <SiJsonwebtokens size={90} /> <p>Jsonwebtoken</p>
          </div>
          <div className="">
            <IoLogoFirebase size={90} /> <p>Firebase</p>
          </div>
          <div className="">
            <SiMongodb size={90} /> <p>MongoDB</p>
          </div>
          <div className="">
            <RiTailwindCssLine size={90} /> <p>Tailwind Css</p>
          </div>
          <div className="">
            <TbBrandJavascript size={90} />
            <p>Javascript</p>
          </div>
          <div className="">
            <SiCss3 size={90} /> <p>CSS3</p>
          </div>
          <div className="">
            <FaHtml5 size={90} /> <p>HTML5</p>
          </div>
        </div>
      </Marquee>
    </div>
  );
};

export default MySkills;
