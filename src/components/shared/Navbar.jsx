"use client";
import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Nosifer } from "next/font/google";
import { signOut, useSession } from "next-auth/react";
import usePublic from "@/hooks/usePublic";
import { toast } from "react-toastify";
import CustomToast from "./CustomToast";
import { ScrollContext } from "@/service/ScrollProvider";
import { usePathname } from "next/navigation";

const nosifer = Nosifer({ weight: ["400"], subsets: ["latin"] }); // Initialize the font

const Navbar = () => {
  const dropdownRef = useRef(null);
  const pathname = usePathname();
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Toggle state
  const session = useSession();
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
    setIsDropdownOpen(!isDropdownOpen); // Toggle the dropdown open/close
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
    toast(<CustomToast title="Success!" message="Logout successfully" />, {
      autoClose: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      className: "border-2 border-white",
      theme: "dark",
    });
  };

  const links = [{ title: "Home", path: "/" }];

  return (
    <div>
      <div
        className="navbar text-white"
        style={{
          background:
            "linear-gradient(90deg, rgba(30, 30, 30, 0.9), rgba(50, 50, 50, 0.9))",
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
              style={{
                position: "absolute",
                top: "100%",
                left: "0",
                zIndex: 9999, // Ensures the dropdown is above everything
              }}
              className={`menu menu-lg space-y-2 dropdown-content bg-black rounded-box mt-3 w-52 p-2 shadow ${
                isDropdownOpen ? "block" : "hidden"
              }`}
            >
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
              {pathname === "/" && (
                <>
                  <li>
                    <button
                      onClick={() => scrollToSection(section1Ref)}
                      className="nav-button focus:text-[#EF4444]"
                    >
                      About
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection(section2Ref)}
                      className="nav-button focus:text-[#EF4444]"
                    >
                      Skills
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection(section3Ref)}
                      className="nav-button focus:text-[#EF4444]"
                    >
                      Projects
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection(section4Ref)}
                      className="nav-button focus:text-[#EF4444]"
                    >
                      Journey
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection(section5Ref)}
                      className="nav-button focus:text-[#EF4444]"
                    >
                      Contact
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
          <a className={`text-xl text-[#EF4444] ${nosifer.className}`}>
            Reduan.
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
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
            {pathname === "/" && (
              <>
                <li>
                  <button
                    onClick={() => scrollToSection(section1Ref)}
                    className="nav-button focus:text-[#EF4444]"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection(section2Ref)}
                    className="nav-button focus:text-[#EF4444]"
                  >
                    Skills
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection(section3Ref)}
                    className="nav-button focus:text-[#EF4444]"
                  >
                    Projects
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection(section4Ref)}
                    className="nav-button focus:text-[#EF4444]"
                  >
                    Journey
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection(section5Ref)}
                    className="nav-button focus:text-[#EF4444]"
                  >
                    Contact
                  </button>
                </li>
              </>
            )}
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
          {session.status === "loading" ? (
            <p>Loading...</p>
          ) : session?.data?.user ? (
            <button
              onClick={handleSignOut}
              className="btn bg-transparent border text-white hover:text-black"
            >
              Logout
            </button>
          ) : (
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
