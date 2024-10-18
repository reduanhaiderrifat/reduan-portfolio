import { Nosifer } from "next/font/google";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const nosifer = Nosifer({ weight: ["400"], subsets: ["latin"] });
const Footer = () => {
  return (
    <div>
      <footer
        style={{
          background:
            "linear-gradient(90deg, rgba(30, 30, 30, 0.9), rgba(50, 50, 50, 0.9))",
        }}
        className="footer text-neutral-content p-10"
      >
        <aside>
          <h1 className={`text-4xl ${nosifer.className}`}>Reduan.</h1>
          <p>
            I am a Junior Web Developer <br /> I want a Job Front-End
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <Link
              className="hover:border hover:rounded-full p-2"
              target="_blank"
              href="https://x.com/reduan_rifat77"
            >
              <FaTwitter size={25} />
            </Link>
            <Link
              className="hover:border hover:rounded-full p-2"
              target="_blank"
              href="https://www.youtube.com/@rifat-nxt"
            >
              <FaYoutube size={25} />
            </Link>
            <Link
              className="hover:border hover:rounded-full p-2"
              target="_blank"
              href="https://www.facebook.com/bosonterrifat"
            >
              <FaFacebook size={25} />
            </Link>
            <Link
              className="hover:border hover:rounded-full p-2"
              target="_blank"
              href="https://www.linkedin.com/in/rifat-nxt"
            >
              <FaLinkedin size={25} />
            </Link>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
