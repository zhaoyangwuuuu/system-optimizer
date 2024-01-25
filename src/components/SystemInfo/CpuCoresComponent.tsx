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

  const renderCpuInfoBoxes = () => {
    return (
      <div className='grid grid-cols-5 gap-4'>
        {cpuCoresData.map((data, index) => {
          const mostRecentUsage = data[data.length - 1];
          const borderColor = generateColor(index);
          return (
            <div
              key={index}
              className='flex items-center justify-center p-2 m-1 border-2 rounded'
              style={{
                borderColor: borderColor,
                width: "100%",
              }}
            >
              <span className='font-bold mr-2'>CPU{index + 1}</span>
              <span className='text-sm'>{mostRecentUsage}%</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <React.Fragment>
      <div>
        <Line data={cpuCoreChart} options={options} />
      </div>
      <div className='p-2'>{renderCpuInfoBoxes()}</div>
    </React.Fragment>
  );
};

export default CpuCoresComponent;
