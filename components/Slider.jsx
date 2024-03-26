import React, { useState, useEffect } from "react";

const WorkSlider = ({ children }) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prevOffset) => prevOffset - 1);
    }, 10); // Adjust the interval duration as needed for your desired animation speed

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="work-slider"
      style={{
        transform: `translateX(${offset}px)`,
        display: "flex",
        flexDirection: "row",
      }}
    >
      {children}
    </div>
  );
};

export default WorkSlider;
