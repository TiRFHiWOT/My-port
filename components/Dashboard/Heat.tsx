import React, { useEffect, useState } from "react";
import HeatMap from "react-heatmap-grid";
import ClipLoader from "react-spinners/ClipLoader";
import { fetchVisitData } from "./LogVisitor";

const HeatmapComponent = () => {
  const [heatmapData, setHeatmapData] = useState<number[][]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchVisitData();
        setHeatmapData(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const hours = Array.from({ length: 24 }, (_, i) => `${i}`);

  return (
    <div className="shadow-md rounded-lg p-6 bg-gray-900 border border-gray-700">
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <ClipLoader color="#ffffff" size={40} />
        </div>
      ) : (
        heatmapData.length > 0 && (
          <HeatMap
            xLabels={hours}
            yLabels={days}
            data={heatmapData}
            square
            cellStyle={(background, value, min, max) => {
              const intensity = value ? (value / max) * 0.8 : 0;
              return {
                background: `linear-gradient(135deg, rgba(255, 99, 132, ${intensity}) 0%, rgba(255, 206, 86, ${intensity}) 100%)`,
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                fontSize: "14px",
                color: "#e0e0e0",
                textAlign: "center",
                transition: "background 0.3s ease, transform 0.3s ease",
                cursor: "pointer",
                padding: "4px",
              };
            }}
            cellRender={(value) => (value ? `${value}` : "")}
            cellHoverStyle={(background, value, min, max) => ({
              background: `linear-gradient(135deg, rgba(255, 99, 132, 1) 0%, rgba(255, 206, 86, 1) 100%)`,
              border: "1px solid rgba(255, 255, 255, 0.6)",
              transform: "scale(1.1)",
            })}
            aria-label="Heatmap showing visit intensity across days and hours"
          />
        )
      )}
    </div>
  );
};

export default HeatmapComponent;
