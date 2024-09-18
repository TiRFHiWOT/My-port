import React from "react";

const Lines = () => {
  return (
    <section>
      <div className="absolute inset-0 flex justify-center items-center -rotate-45 -z-20 pointer-events-none">
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={`h-line-${index}`}
            className="absolute w-[200vw] h-[1px] bg-gray-700"
            style={{
              top: `${(index + 1) * 16}%`,
              opacity: 0.4,
            }}
          >
            <div
              className="glowing-dot"
              style={{ animationDelay: `${index * 2.5}s` }}
            ></div>
          </div>
        ))}
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={`v-line-${index}`}
            className="absolute h-[200vw] w-[1px] bg-gray-700"
            style={{
              left: `${(index + 1) * 16}%`,
              opacity: 0.4,
            }}
          >
            <div
              className="glowing-dot-vertical "
              style={{ animationDelay: `${index * 2.5}s` }}
            ></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Lines;
