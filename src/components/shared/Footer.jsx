import { Nosifer } from "next/font/google";
import React from "react";
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const nosifer = Nosifer({ weight: ["400"], subsets: ["latin"] }); // Initialize the font
const Footer = () => {
  return (
    <div>
      <footer
        style={{
          background:
            "linear-gradient(90deg, rgba(30, 30, 30, 0.9), rgba(50, 50, 50, 0.9))", // Dark gradient
        }}
        className="footer text-neutral-content p-10"
      >
        <aside>
          <h1 className={`text-4xl ${nosifer.className}`}>Reduan.</h1>
          <p>
            ACME Industries Ltd.
            <br />
            Providing reliable tech since 1992
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a href="#">
              <FaTwitter size={25} />
            </a>
            <a href="#">
              <FaYoutube size={25} />
            </a>
            <a href="#">
              <FaFacebook size={25} />
            </a>
            <a href="#">
              <FaLinkedin size={25} />
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
