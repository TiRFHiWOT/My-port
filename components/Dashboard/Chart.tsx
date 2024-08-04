"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { fetchDashboardData } from "@/store/slice/dashboardSlice";
import Image from "next/image";
import { RootState } from "@/store/store";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardChart = () => {
  const dispatch = useDispatch();
  const { totalSkills, totalProjects, totalWorkExperience, totalTestimonials } =
    useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData() as any);
  }, [dispatch]);

  const data = {
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

  return (
    <div className="relative max-w-5xl mx-auto my-12 p-8 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl shadow-2xl overflow-hidden">
      <Image
        src="/swirl.png"
        alt="Background Swirl"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 opacity-20"
      />
      <div className="relative bg-gray-800 bg-opacity-70 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-gray-100 mb-6 text-center tracking-wider">
          Overview
        </h1>

        <div className="mb-8">
          <Bar
            data={data}
            options={{
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
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardChart;
