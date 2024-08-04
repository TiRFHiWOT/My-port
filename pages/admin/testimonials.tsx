import dynamic from "next/dynamic";
import AdminLayout from "@/components/AdminLayout/AdminLayout";

const TestimonialsPage = dynamic(
  () => import("@/components/Testimonials/Admin/Page"),
  {
    ssr: false,
  }
);

const Testimonials = () => {
  return (
    <AdminLayout>
      <TestimonialsPage />
    </AdminLayout>
  );
};

export default Testimonials;
