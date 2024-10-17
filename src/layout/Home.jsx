"use client";
import React, { useContext } from "react";
import Banner from "@/components/home/Banner";
import PortfolioImage from "@/components/home/PortfolioImage";
import MySkills from "@/components/home/MySkills";
import MyJourny from "@/components/home/MyJourny";
import Contact from "@/components/home/Contact";
import MyProjects from "@/components/dashboard/MyProjects";
import { ScrollContext } from "@/service/ScrollProvider";

const HomePage = () => {
  const {
    section1Ref,
    section2Ref,
    section3Ref,
    section4Ref,
    section5Ref,
    scrollToSection,
  } = useContext(ScrollContext);
  return (
    <div>
      <Banner />{" "}
      <PortfolioImage
        scrollToSection={scrollToSection}
        section1Ref={section1Ref}
      />{" "}
      <MySkills scrollToSection={scrollToSection} section2Ref={section2Ref} />
      <MyProjects
        scrollToSection={scrollToSection}
        section3Ref={section3Ref}
      />{" "}
      <MyJourny scrollToSection={scrollToSection} section4Ref={section4Ref} />{" "}
      <Contact scrollToSection={scrollToSection} section5Ref={section5Ref} />
    </div>
  );
};

export default HomePage;
