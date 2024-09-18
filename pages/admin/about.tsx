import dynamic from "next/dynamic";
import AdminLayout from "@/components/AdminLayout/AdminLayout";

const AboutPage = dynamic(() => import("@/components/About/Admin/page"), {
  ssr: false,
});

const About = () => {
  return (
    <AdminLayout>
      <AboutPage />
    </AdminLayout>
  );
};

export default About;
