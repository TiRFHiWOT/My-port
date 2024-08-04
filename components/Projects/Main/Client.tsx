"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects, setTag } from "@/store/slice/projectsSlice";
import ProjectTag from "./ProjectTag";
import ProjectMap from "./ProjectMap";
import { RotatingLines } from "react-loader-spinner";
import { RootState } from "@/store/store";

const ProjectsClient = () => {
  const dispatch = useDispatch();
  const { allProjects, loading, tag } = useSelector(
    (state: RootState) => state.projects
  );

  const handleTagChange = (newTag: string) => {
    dispatch(setTag(newTag));
  };

  useEffect(() => {
    dispatch(fetchProjects() as any);
  }, [dispatch]);

  return (
    <div className="py-6">
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
      ) : (
        <div className="grid md:gap-6 gap-4 grid-cols-1 lg:grid-cols-3 relative">
          {allProjects.map((project, index) => {
            const isPublic = project.gitUrl && project.previewUrl;
            const isPrivate = !isPublic;
            if (
              tag === "ALL" ||
              (tag === "PUBLIC" && isPublic) ||
              (tag === "PRIVATE" && isPrivate)
            ) {
              return (
                <ProjectMap key={project.id} project={project} index={index} />
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default ProjectsClient;
