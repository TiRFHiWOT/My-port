import { useEffect } from "react";
import DashboardChart from "@/components/Dashboard/Chart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  useEffect(() => {
    if (sessionStorage.getItem("fromLogin")) {
      toast.info("Logged in successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: "light",
      });
      sessionStorage.removeItem("fromLogin");
    }
    if (sessionStorage.getItem("fromRegister")) {
      toast.info("Welcome to the Dashboard!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: "light",
      });
      sessionStorage.removeItem("fromRegister");
    }
  }, []);

  return (
    <div>
      <DashboardChart />
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
