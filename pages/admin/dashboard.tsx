import dynamic from "next/dynamic";
import AdminLayout from "@/components/AdminLayout/AdminLayout";

const DashboardPage = dynamic(
  () => import("@/components/Dashboard/Dashboard"),
  {
    ssr: false,
  }
);

const Dashboard = () => {
  return (
    <AdminLayout>
      <DashboardPage />
    </AdminLayout>
  );
};

export default Dashboard;
