import dynamic from "next/dynamic";
import AdminLayout from "@/components/AdminLayout/AdminLayout";

const EducationPage = dynamic(
  () => import("@/components/Education/Admin/Page"),
  {
    ssr: false,
  }
);

const Education = () => {
  return (
    <AdminLayout>
      <EducationPage />
    </AdminLayout>
  );
};

export default Education;
