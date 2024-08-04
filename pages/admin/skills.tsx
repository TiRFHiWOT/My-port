import dynamic from "next/dynamic";
import AdminLayout from "@/components/AdminLayout/AdminLayout";

const SkillsPage = dynamic(() => import("@/components/Skills/Admin/Page"), {
  ssr: false,
});

const Skills = () => {
  return (
    <AdminLayout>
      <SkillsPage />
    </AdminLayout>
  );
};

export default Skills;
