import dynamic from "next/dynamic";
import AdminLayout from "@/components/AdminLayout/AdminLayout";

const ProjectsPage = dynamic(() => import("@/components/Projects/Admin/Page"), {
  ssr: false,
});

const Projects = () => {
  return (
    <AdminLayout>
      <ProjectsPage />
    </AdminLayout>
  );
};

export default Projects;
