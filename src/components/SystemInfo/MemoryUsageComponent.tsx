import React from "react";
import { Line } from "react-chartjs-2";

interface MemoryUsageComponentProps {
  memoryUsageData: number[];
  options: any;
  TIME_LABELS: string[];
}

const MemoryUsageComponent: React.FC<MemoryUsageComponentProps> = ({
  memoryUsageData,
  options,
  TIME_LABELS,
}) => {
  const memoryUsageChart = {
    labels: TIME_LABELS,
    datasets: [
      {
        data: memoryUsageData,
        borderColor: "rgba(53, 162, 235, 0.8)",
        fill: false,
        borderWidth: 1,
        pointRadius: 0,
        tension: 0.5,
      },
    ],
  };

  return (
    <div>
      <Line data={memoryUsageChart} options={options} />
    </div>
  );
};

export default MemoryUsageComponent;
