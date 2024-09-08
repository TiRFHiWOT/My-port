import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: any;
  options: any;
}

const PieChart: React.FC<PieChartProps> = ({ data, options }) => {
  const { totalSkills, totalProjects, totalWorkExperience, totalTestimonials } =
    useSelector((state: RootState) => state.dashboard);

  const pieData = {
    labels: ["Skills", "Projects", "Work Experience", "Testimonials"],
    datasets: [
      {
        label: "Category Distribution",
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

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#fff",
          font: {
            size: 14,
            style: "italic",
            color: "#4b5563",
          },
          boxWidth: 20,
          padding: 20,
        },
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
  return <Pie data={data} options={options} />;
};

export default PieChart;
