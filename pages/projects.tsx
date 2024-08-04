import React, { Suspense, lazy } from "react";
import ProjectClient from "../components/Projects/Main/Client";
import type { Metadata } from "next";
import { RotatingLines } from "react-loader-spinner";

export const metadata: Metadata = {
  title: "Projects page",
  description: "Projects of this portifolio",
};

const AnimatedHeading = lazy(
  () => import("../components/Projects/Main/Heading")
);

const Projects = () => {
  return (
    <section id="Projects">
      <div className="md:px-24 px-8 py-6 lg:py-16 my-8 md:my-16 relative">
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
        <Suspense
          fallback={
            <div className="flex justify-center items-center">
              <RotatingLines width="50" />
            </div>
          }
        >
          <AnimatedHeading />
        </Suspense>
        <ProjectClient />
      </div>
    </section>
  );
};

export default Projects;
