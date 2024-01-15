import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setRefreshRate } from "@/redux/slices/refreshRateSlice";
import {
  generateMockMemoryUsage,
  generateMockCoresData,
  generateColor,
} from "@/utils/ChartUtils";
Chart.register(...registerables);

const __DEBUG__ = process.env.NEXT_PUBLIC_DEBUG_MODE || false;
const X_AXIS_LENGTH = 15;

// Styles
const borderColor = "rgba(53, 162, 235, 0.8)";

export type GetCpuCoreData = {
  usage: number;
};

// TODO: Separate into different components
const SystemInfo: React.FC = () => {
  const [cpuCoresData, setCpuCoresData] = useState<number[][]>([]);

  const [totalMemory, setTotalMemory] = useState<number>(0);
  const [usedMemory, setUsedMemory] = useState<number>(0);
  const [memoryUsageData, setMemoryUsageData] = useState<number[]>(
    new Array(X_AXIS_LENGTH).fill(0)
  );

  const refreshRate = useSelector(
    (state: RootState) => state.refreshRate.value
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const generateChartCpuCoreData = (data: GetCpuCoreData[]) => {
      // set a new array with number of cores filled with 0
      if (cpuCoresData.length === 0) {
        setCpuCoresData(
          new Array(data.length).fill(new Array(X_AXIS_LENGTH).fill(0))
        );
      }

      setCpuCoresData((currentData) =>
        currentData.map((subArray, index) => {
          return [...subArray.slice(1), data[index].usage];
        })
      );
    };

    const intervalId = setInterval(() => {
      if (__DEBUG__) {
        const mockMemoryUsage = generateMockMemoryUsage();
        setTotalMemory(32);
        setUsedMemory(mockMemoryUsage);
      } else {
        invoke<[number, number]>("get_memory_usage")
          .then(([total, used]) => {
            const totalGb = total / (1024 * 1024 * 1024);
            const usedGb = used / (1024 * 1024 * 1024);

            setTotalMemory(totalGb);
            setUsedMemory(usedGb);
          })
          .catch(console.error);
      }

      if (__DEBUG__) {
        let data = generateMockCoresData(8);
        generateChartCpuCoreData(data);
      } else {
        invoke<GetCpuCoreData[]>("get_cpus_info").then(
          (coresData: GetCpuCoreData[]) => {
            generateChartCpuCoreData(coresData);
          }
        );
      }
    }, refreshRate);

    let usedPercentage = (usedMemory / totalMemory) * 100;
    if (isNaN(usedPercentage)) {
      usedPercentage = 0;
    }
    setMemoryUsageData((currentData) =>
      [...currentData, usedPercentage].slice(-X_AXIS_LENGTH)
    );
    return () => clearInterval(intervalId);
  }, [totalMemory, usedMemory, cpuCoresData, refreshRate]);

  // TODO: Change TIME_LABELS according to refresh rate
  const TIME_LABELS = new Array(X_AXIS_LENGTH)
    .fill(null)
    .map((_, index) => `${X_AXIS_LENGTH - 1 - index}s`);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
      x: {
        display: true,
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    animation: {
      duration: 0,
    },
  };

  const memoryUsageChart = {
    labels: TIME_LABELS,
    datasets: [
      {
        data: memoryUsageData,
        borderColor,
        fill: false,
        borderWidth: 1,
        pointRadius: 0,
        tension: 0.5,
      },
    ],
  };

  const cpuCoreChart = {
    labels: TIME_LABELS,
    datasets: cpuCoresData.map((data, index) => {
      return {
        label: `CPU ${index + 1}`,
        data,
        borderColor: generateColor(index),
        fill: false,
        borderWidth: 1,
        pointRadius: 0,
        tension: 0.5,
      };
    }),
  };

  const cpuCoreChartOptions = {
    ...options,
    plugins: {
      legend: {
        display: true,
      },
    },
    animation: {
      duration: 0,
    },
  };

  return (
    <div>
      <p>Memory Usage: {((usedMemory / totalMemory) * 100).toFixed(2)} %</p>
      <div>
        <Line data={memoryUsageChart} options={options} />
      </div>
      <div>
        <Line data={cpuCoreChart} options={cpuCoreChartOptions} />
      </div>
    </div>
  );
};

export default SystemInfo;
