"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Nosifer } from "next/font/google";
import { signOut, useSession } from "next-auth/react";

import usePublic from "@/hooks/usePublic";
import { toast } from "react-toastify";
import CustomToast from "./CustomToast";
import { ScrollContext } from "@/service/ScrollProvider";

const nosifer = Nosifer({ weight: ["400"], subsets: ["latin"] }); // Initialize the font
const Navbar = () => {
  const dropdownRef = useRef(null);
  const axiosPublic = usePublic();
  const {
    section1Ref,
    section2Ref,
    section3Ref,
    section4Ref,
    section5Ref,
    scrollToSection,
  } = useContext(ScrollContext);
  const [role, setRole] = useState({});
  const session = useSession();
  const pathname = usePathname();
  const email = session?.data?.user?.email;
  useEffect(() => {
    if (email) {
      axiosPublic
        .post(`/api/user-get`, { email })
        .then((response) => {
          setRole(response.data); // Assuming response.data contains the role
        })
        .catch((error) => {
          console.error("Error fetching user role:", error);
        });
    }
  }, [axiosPublic, email]);
  const toggleDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.classList.toggle("hidden");
    }
  };
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
    toast(<CustomToast title="Success!" message="Logout successfully" />, {
      autoClose: false, // Disable auto-close
      closeOnClick: true,
      draggable: true,
      progress: undefined, // Stop the progress bar
      className: "border-2 border-white",
      theme: "dark", // Set theme to dark
    });
  };

  const links = [{ title: "Home", path: "/" }];

  return (
    <div>
      <div
        className="navbar text-white fixed"
        style={{
          background:
            "linear-gradient(90deg, rgba(30, 30, 30, 0.9), rgba(50, 50, 50, 0.9))", // Dark gradient
        }}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
              onClick={toggleDropdown}
            >
              <FaBars size={25} />
            </div>
            <ul
              ref={dropdownRef}
              tabIndex={0}
              className="menu menu-lg space-y-2 dropdown-content bg- rounded-box z-100 mt-3 w-52 p-2 shadow hidden"
            >
              <li>
                <button
                  onClick={() => scrollToSection(section1Ref)}
                  className="nav-button focus:text-white"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection(section2Ref)}
                  className="nav-button focus:text-white"
                >
                  Skills
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection(section3Ref)}
                  className="nav-button focus:text-white"
                >
                  Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection(section4Ref)}
                  className="nav-button focus:text-white"
                >
                  Journey
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection(section5Ref)}
                  className="nav-button focus:text-white"
                >
                  Contact
                </button>
              </li>
              {links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    className={
                      pathname === link.path
                        ? "text-[#EF4444] font-bold border"
                        : "text-white"
                    }
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <a className={`text-xl text-[#EF4444]  ${nosifer.className}`}>
            Reduan.
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <button
                onClick={() => scrollToSection(section1Ref)}
                className="nav-button focus:text-white"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection(section2Ref)}
                className="nav-button focus:text-white"
              >
                Skills
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection(section3Ref)}
                className="nav-button focus:text-white"
              >
                Projects
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection(section4Ref)}
                className="nav-button focus:text-white"
              >
                Journey
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection(section5Ref)}
                className="nav-button focus:text-white"
              >
                Contact
              </button>
            </li>
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.path}
                  className={
                    pathname === link.path
                      ? "text-[#EF4444] font-bold"
                      : "text-white"
                  }
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end">
          {role?.user?.role === "admin" && (
            <Link
              href={"/dashboard"}
              className="btn bg-transparent border text-white hover:text-black mr-3"
            >
              Dashboard
            </Link>
          )}
          {session.status === "loading" ? ( // Show loading when the session is loading
            <p>Loading...</p>
          ) : session?.data?.user ? ( // Check if user is logged in
            <button
              // onClick={() => signOut({ callbackUrl: "/" })}
              onClick={handleSignOut} // Use the new sign-out handler
              className="btn bg-transparent border text-white hover:text-black"
            >
              Logout
            </button>
          ) : (
            // Show login link if not logged in
            <Link
              href="/login"
              className="btn border-2 border-transparent rounded-lg transition-all duration-300 ease-in-out hover:border-white"
              style={{
                background:
                  "linear-gradient(90deg, rgb(1, 105, 216), rgba(255, 0, 150, 0.9))",
                color: "#fff",
              }}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
