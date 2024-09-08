import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDashboardData } from "@/store/slice/dashboardSlice";
import Image from "next/image";
import { RootState } from "@/store/store";
import { db } from "@/app/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { EyeIcon } from "@heroicons/react/24/outline";
import BarChart from "./Bar";
import LineChart from "./Line";
import TopIPChart from "./TopIpChart";
import { ClipLoader } from "react-spinners";

const DashboardChart = () => {
  const dispatch = useDispatch();
  const { totalSkills, totalProjects, totalWorkExperience, totalTestimonials } =
    useSelector((state: RootState) => state.dashboard);
  const [totalVisitors, setTotalVisitors] = useState<number | null>(null);
  const [monthlyVisitors, setMonthlyVisitors] = useState<number[]>(
    Array(12).fill(0)
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    dispatch(fetchDashboardData() as any);
  }, [dispatch]);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "siteVisits"));

        setTotalVisitors(querySnapshot.size);

        const visitsData: { timestamp: { seconds: number } }[] =
          querySnapshot.docs.map(
            (doc) => doc.data() as { timestamp: { seconds: number } }
          );

        const monthlyCounts = Array(12).fill(0);

        visitsData.forEach(({ timestamp }) => {
          const date = new Date(timestamp.seconds * 1000);
          const month = date.getMonth();
          monthlyCounts[month]++;
        });

        setMonthlyVisitors(monthlyCounts);
      } catch (error) {
        console.error("Failed to fetch visits data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVisits();
  }, []);

  const barData = {
    labels: ["Skills", "Projects", "Work Experience", "Testimonials"],
    datasets: [
      {
        label: "Totals",
        data: [
          totalSkills,
          totalProjects,
          totalWorkExperience,
          totalTestimonials,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const generateMonthlyLabels = () => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return monthNames;
  };

  const lineData = {
    labels: generateMonthlyLabels(),
    datasets: [
      {
        label: "Visitors",
        data: monthlyVisitors,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="relative max-w-5xl mx-auto my-12 p-8 bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-2xl overflow-hidden">
      <Image
        src="/swirl.png"
        alt="Background Swirl"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 opacity-20"
      />

      <div className="relative bg-gray-800 bg-opacity-70 p-8 rounded-lg shadow-lg backdrop-blur-sm">
        <h1 className="text-4xl font-extrabold text-gray-100 mb-6 text-center tracking-wider">
          Overview
        </h1>
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <ClipLoader color="#ffffff" size={40} />
          </div>
        ) : (
          <div>
            <BarChart data={barData} options={options} />

            <div className="flex flex-row gap-5 mt-10">
              <div className="border border-gray-700 p-4 rounded-lg w-4/12">
                <TopIPChart />
              </div>
              <div className="border border-gray-700 p-4 rounded-lg w-8/12">
                <LineChart data={lineData} options={options} />
              </div>
            </div>

            {totalVisitors !== null && (
              <motion.div
                className="absolute top-10 right-14 bg-gray-900 border border-gray-700 border-l-8 text-gray-100 p-4 rounded-lg shadow-lg flex flex-row"
                initial={{ opacity: 0, scale: 0.5, x: "40px" }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="font-bold text-gray-500 tracking-wider mr-2 flex flex-row">
                  <EyeIcon className="h-6 w-6 text-green-500 mr-2" />:
                </h2>
                <CountUp
                  end={totalVisitors}
                  duration={5}
                  className="text-green-500"
                />
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardChart;
