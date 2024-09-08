"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects, setTag } from "@/store/slice/projectsSlice";
import ProjectTag from "./ProjectTag";
import ProjectMap from "./ProjectMap";
import { RotatingLines } from "react-loader-spinner";
import { RootState } from "@/store/store";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

const ProjectsClient = () => {
  const dispatch = useDispatch();
  const { allProjects, loading, tag } = useSelector(
    (state: RootState) => state.projects
  );

  const [visibleCount, setVisibleCount] = useState(3);
  const [showMore, setShowMore] = useState(true);

  const handleTagChange = (newTag: string) => {
    dispatch(setTag(newTag));
    setVisibleCount(3);
    setShowMore(true);
  };

  useEffect(() => {
    dispatch(fetchProjects() as any);
  }, [dispatch]);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
    if (visibleCount + 3 >= allProjects.length) {
      setShowMore(false);
    }
  };

  const handleHide = () => {
    setVisibleCount(3);
    setShowMore(true);
  };

  const filteredProjects = allProjects.filter((project) => {
    const isPublic = project.gitUrl && project.previewUrl;
    const isPrivate = !isPublic;
    return (
      tag === "ALL" ||
      (tag === "PUBLIC" && isPublic) ||
      (tag === "PRIVATE" && isPrivate)
    );
  });

  return (
    <div className="relative py-6">
      <div className="relative z-10">
        <div className="flex justify-center mb-5">
          <div className="text-white border-2 border-[#334155] rounded-full overflow-hidden">
            <ProjectTag
              options={["ALL", "PUBLIC", "PRIVATE"]}
              onSelect={handleTagChange}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center">
            <RotatingLines width="50" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-4">No projects available.</div>
        ) : (
          <div className="grid md:gap-6 gap-4 grid-cols-1 lg:grid-cols-3 relative">
            {filteredProjects.slice(0, visibleCount).map((project, index) => (
              <ProjectMap key={project.id} project={project} index={index} />
            ))}
          </div>
        )}

        {showMore && visibleCount < filteredProjects.length && (
          <div className="flex justify-end mt-4 relative z-10">
            <button
              onClick={handleShowMore}
              className="flex items-center text-gray-400 hover:text-gray-600"
            >
              Show More
              <ChevronDownIcon className="ml-2 h-5 w-5" />
            </button>
          </div>
        )}

        {!showMore && (
          <div className="flex justify-end mt-4 relative z-10">
            <button
              onClick={handleHide}
              className="flex items-center text-gray-400 hover:text-gray-600"
            >
              Show Less
              <ChevronUpIcon className="ml-2 h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsClient;
