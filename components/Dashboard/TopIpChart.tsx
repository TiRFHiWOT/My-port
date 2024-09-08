import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { db } from "@/app/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

ChartJS.register(ArcElement, Tooltip, Legend);

const TopIPChart = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchTopIPs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "siteVisits"));
        const ipCounts: { [key: string]: number } = {};

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const ip = doc.id;
          const visitCount = data.visitCount || 0;
          ipCounts[ip] = (ipCounts[ip] || 0) + visitCount;
        });

        const sortedIPs = Object.entries(ipCounts).sort((a, b) => b[1] - a[1]);
        const topIPs = sortedIPs.slice(0, 5);

        setChartData({
          labels: topIPs.map(([ip]) => ip),
          datasets: [
            {
              label: "Visit Count",
              data: topIPs.map(([, count]) => count),
              backgroundColor: [
                "rgba(255, 87, 34, 0.6)",
                "rgba(139, 195, 74, 0.6)",
                "rgba(33, 150, 243, 0.6)",
                "rgba(255, 193, 7, 0.6)",
                "rgba(233, 30, 99, 0.6)",
              ],
              borderColor: [
                "rgba(255, 87, 34, 1)",
                "rgba(139, 195, 74, 1)",
                "rgba(33, 150, 243, 1)",
                "rgba(255, 193, 7, 1)",
                "rgba(233, 30, 99, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Failed to fetch IP data:", error);
      }
    };

    fetchTopIPs();
  }, []);

  if (!chartData) return "";

  return (
    <div>
      <Doughnut
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  const ipAddress = chartData.labels[tooltipItem.dataIndex];
                  const visitCount = tooltipItem.raw;
                  return `Visit Count: ${visitCount}`;
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default TopIPChart;
