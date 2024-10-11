"use client";
import MyCertificate from "@/components/dashboard/MyCertificate";
import MyProjects from "@/components/dashboard/MyProjects";
import ProjectPost from "@/components/dashboard/ProjectPost";

import { useSession } from "next-auth/react";

import React, { useState, useEffect, useRef } from "react";

const Page = () => {
  const [activeItem, setActiveItem] = useState(null); // State to track the active sidebar item
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to track the drawer state
  const drawerRef = useRef(null); // Reference to the drawer element

  const handleItemClick = (item) => {
    setActiveItem(item); // Set the active item based on user selection
  };

  // Function to render content based on the active item
  const renderContent = () => {
    switch (activeItem) {
      case "item1":
        return <ProjectPost />;
      case "item2":
        return <MyProjects />;
      case "item3":
        return <MyCertificate />;
      default:
        return <ProjectPost />;
    }
  };

  // Function to determine the class for each sidebar item
  const getItemClass = (item) => {
    return activeItem === item
      ? "border-2 rounded-2xl shadow-inner border-blue-500"
      : ""; // Active item class
  };

  // Handle click outside to close drawer
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setIsDrawerOpen(false); // Close drawer if clicked outside
      }
    };
    if (isDrawerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDrawerOpen]);

  const session = useSession(); // Fetch the session server-side
  if (!session || !session?.data?.user) {
    // Handle session logic directly
    return (
      <div>
        <h1>You are not authenticated. Please log in.</h1>
      </div>
    );
  }

  const email = session?.data?.user.email;

  // Connect to the database
  const db = connectDB();
  const user = db.collection("users").findOne({ email });

  if (!user) {
    return (
      <div>
        <h1>You are not authorized. Please log in.</h1>
      </div>
    );
  }

  // Check user role
  if (user.role !== "admin") {
    return (
      <div>
        <h1>You do not have access to this page.</h1>
      </div>
    );
  }
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input
          id="my-drawer-2"
          type="checkbox"
          className="drawer-toggle"
          checked={isDrawerOpen} // Bind the state to the checkbox
          readOnly
        />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn border-white bg-transparent hover:bg-transparent text-[#EF4444] drawer-button lg:hidden"
            onClick={() => setIsDrawerOpen(true)} // Open drawer on button click
          >
            Open drawer
          </label>
          {renderContent()} {/* Render content based on the active item */}
        </div>
        <div ref={drawerRef} className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
            onClick={() => setIsDrawerOpen(false)} // Close drawer on overlay click
          ></label>
          <ul className="menu border-r-2 mt-12 text-white min-h-full w-auto p-4">
            {/* Sidebar content here */}
            <li className={getItemClass("item1")}>
              <button onClick={() => handleItemClick("item1")}>
                POST PROJECT
              </button>
            </li>
            <li className={getItemClass("item2")}>
              <button onClick={() => handleItemClick("item2")}>
                MY PROJECT
              </button>
            </li>
            <li className={getItemClass("item3")}>
              <button onClick={() => handleItemClick("item3")}>
                MY CERTIFICATE
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
