import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminIndex = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/dashboard");
  }, [router]);

  return null;
};

export default AdminIndex;
