"use client";
import MyCertificate from "@/components/dashboard/MyCertificate";
import MyProjects from "@/components/dashboard/MyProjects";
import ProjectPost from "@/components/dashboard/ProjectPost";
import React, { useState } from "react";

const Page = () => {
  const [activeItem, setActiveItem] = useState(null); // State to track the active sidebar item

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

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
          {renderContent()} {/* Render content based on the active item */}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2 "
            aria-label="close sidebar"
            className="drawer-overlay "
          ></label>
          <ul className="menu border-r-2 text-white min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li className={getItemClass("item1")}>
              <a onClick={() => handleItemClick("item1")}>POST PROJECT</a>
            </li>
            <li className={getItemClass("item2")}>
              <a onClick={() => handleItemClick("item2")}>MY PROJECT</a>
            </li>
            <li className={getItemClass("item3")}>
              <a onClick={() => handleItemClick("item3")}>MY CERTIFICATE</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
