import React from "react";
import { Line } from "react-chartjs-2";
import { generateColor } from "@/utils/ChartUtils";

interface CpuCoresComponentProps {
  cpuCoresData: number[][];
  options: any;
  TIME_LABELS: string[];
}

const CpuCoresComponent: React.FC<CpuCoresComponentProps> = ({
  cpuCoresData,
  options,
  TIME_LABELS,
}) => {
  const cpuCoreChart = {
    labels: TIME_LABELS,
    datasets: cpuCoresData.map((data, index) => ({
      label: `CPU ${index + 1}`,
      data,
      borderColor: generateColor(index),
      fill: false,
      borderWidth: 1,
      pointRadius: 0,
      tension: 0.5,
    })),
  };

  return (
    <div>
      <Line data={cpuCoreChart} options={options} />
    </div>
  );
};

export default CpuCoresComponent;
