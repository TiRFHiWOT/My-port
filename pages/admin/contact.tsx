import dynamic from "next/dynamic";
import AdminLayout from "@/components/AdminLayout/AdminLayout";

const ContactPage = dynamic(() => import("@/components/Contact/Admin/page"), {
  ssr: false,
});

const Contact = () => {
  return (
    <AdminLayout>
      <ContactPage />
    </AdminLayout>
  );
};

export default Contact;
