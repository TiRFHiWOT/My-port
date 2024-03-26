"use client";
import React, { useState, useEffect } from "react";
import WorkCard from "@/components/WorkCard"; // Assuming the path to your WorkCard component

const InfiniteTranslation = () => {
  const [translation, setTranslation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment the translation value by a certain amount
      setTranslation((prevTranslation) => prevTranslation + 1);
    }, 1000); // Change the interval time as needed

    return () => clearInterval(interval); // Cleanup function to clear the interval
  }, []); // Empty dependency array ensures the effect runs only once

  return <WorkCard style={{ transform: `translateX(${translation}px)` }} />;
};

export default InfiniteTranslation;
