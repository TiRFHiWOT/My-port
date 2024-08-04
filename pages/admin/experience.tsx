import dynamic from "next/dynamic";
import AdminLayout from "@/components/AdminLayout/AdminLayout";

const ExperiencePage = dynamic(() => import("@/components/Work/Admin/Page"), {
  ssr: false,
});

const Experience = () => {
  return (
    <AdminLayout>
      <ExperiencePage />
    </AdminLayout>
  );
};

export default Experience;
