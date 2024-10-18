"use client";
import MyCertificate from "@/components/dashboard/MyCertificate";
import MyProjects from "@/components/dashboard/MyProjects";
import ProjectPost from "@/components/dashboard/ProjectPost";
import Loading from "@/components/Loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";

const Page = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const drawerRef = useRef(null);
  const session = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      if (session?.data?.user) {
        try {
          const response = await fetch(
            `/api/getUser?email=${session.data.user.email}`
          );
          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            console.error("User not found or unauthorized.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setLoading(false);
    };

    if (session.status !== "loading") {
      fetchUser();
    }
  }, [session]);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

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

  const getItemClass = (item) => {
    return activeItem === item
      ? "border-2 rounded-2xl shadow-inner border-blue-500"
      : "";
  };

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/");
    }
  }, [loading, user, router]);

  if (loading) {
    return <Loading />;
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input
          id="my-drawer-2"
          type="checkbox"
          className="drawer-toggle"
          checked={isDrawerOpen}
          readOnly
        />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer-2"
            className="btn border-white bg-transparent hover:bg-transparent text-[#EF4444] drawer-button lg:hidden"
            onClick={() => setIsDrawerOpen(true)}
          >
            Open drawer
          </label>
          {renderContent()}
        </div>
        <div ref={drawerRef} className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
            onClick={() => setIsDrawerOpen(false)}
          ></label>
          <ul className="menu border-r-2 mt-12 text-white min-h-full w-auto p-4">
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
