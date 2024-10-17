"use client";
import { createContext, useRef } from "react";

export const ScrollContext = createContext(null);
const ScrollProvider = ({ children }) => {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const section5Ref = useRef(null);
  // Function to scroll to a section
  const scrollToSection = (sectionRef) => {
    if (sectionRef && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error("Ref is not assigned or is null:", sectionRef);
    }
  };

  const scrollFuction = {
    scrollToSection,
    section1Ref,
    section2Ref,
    section3Ref,
    section4Ref,
    section5Ref,
  };
  return (
    <ScrollContext.Provider value={scrollFuction}>
      {children}
    </ScrollContext.Provider>
  );
};

export default ScrollProvider;
