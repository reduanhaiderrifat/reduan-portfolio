import React from "react";
import Banner from "@/components/home/Banner";
import PortfolioImage from "@/components/home/PortfolioImage";
import MySkills from "@/components/home/MySkills";
import MyJourny from "@/components/home/MyJourny";
import Contact from "@/components/home/Contact";
import MyProjects from "@/components/dashboard/MyProjects";

const HomePage = () => {
  return (
    <div>
      <Banner /> <PortfolioImage /> <MySkills />
      <MyProjects /> <MyJourny /> <Contact />
    </div>
  );
};

export default HomePage;
