import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

// Styles
const rootStyle = getComputedStyle(document.documentElement);
const borderColor =
  rootStyle.getPropertyValue("--chart-border-color") ||
  "rgba(53, 162, 235, 0.8)";

// TODO: name is not used, maybe remove it
type GetCpuCoreData = {
  name: string;
  usage: number;
};

type ChartCpuCoreData = {
  name: string;
  usage: number[];
};

const SystemInfo: React.FC = () => {
  const [cpuUsage, setCpuUsage] = useState<number>(0);
  const [cpuUsageData, setCpuUsageData] = useState<number[]>([]);
  const [cpuCoresData, setCpuCoresData] = useState<ChartCpuCoreData[]>([]);

  const [totalMemory, setTotalMemory] = useState<number>(0);
  const [usedMemory, setUsedMemory] = useState<number>(0);
  const [memoryUsageData, setMemoryUsageData] = useState<number[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      invoke<number>("get_cpu_usage")
        .then((usage) => setCpuUsage(usage))
        .catch(console.error);

      invoke<[number, number]>("get_memory_usage")
        .then(([total, used]) => {
          const totalGb = total / (1024 * 1024 * 1024);
          const usedGb = used / (1024 * 1024 * 1024);

          setTotalMemory(totalGb);
          setUsedMemory(usedGb);
        })
        .catch(console.error);
      invoke<GetCpuCoreData[]>("get_cpus_info").then(
        (coresData: GetCpuCoreData[]) => {
          coresData.map((cores, index) => {
            setCpuCoresData((currentData) => {
              if (
                currentData.length !== 0 &&
                currentData[index] !== undefined
              ) {
                currentData[index].usage.push(cores.usage);
                currentData[index].usage.slice(-30);
                console.log("fffff\n", currentData);
                return currentData;
              } else {
                currentData.push({
                  name: cores.name,
                  usage: [cores.usage],
                });
                return currentData;
              }
            });
          });
        }
      );
    }, 1000);

    setCpuUsageData((currentData) => [...currentData, cpuUsage].slice(-30));

    const usedPercentage = (usedMemory / totalMemory) * 100;
    setMemoryUsageData((currentData) =>
      [...currentData, usedPercentage].slice(-30)
    );
    return () => clearInterval(intervalId);
  }, [cpuUsage, totalMemory, usedMemory, cpuCoresData]);

  const timeLabels = cpuUsageData.map((_, index) => `${index}s`);

  const cpuUsageChart = {
    labels: timeLabels,
    datasets: [
      {
        data: cpuUsageData,
        borderColor,
        borderWidth: 1,
        pointRadius: 0,
        tension: 0.5,
      },
    ],
  };

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
  };

  const memoryUsageChart = {
    labels: timeLabels,
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

  const memoryOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const cpuUsageChart2 = {
    labels: timeLabels,
    datasets: cpuCoresData.map((data: ChartCpuCoreData, index) => {
      return {
        label: `CPU ${index + 1}`,
        data: data.usage,
        borderColor,
        fill: false,
        borderWidth: 1,
        pointRadius: 0,
        tension: 0.5,
      };
    }),
  };

  const options2 = {
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
        display: true,
      },
    },
  };

  return (
    <div>
      <p>CPU Usage: {cpuUsage.toFixed(2)}%</p>
      <div>
        <Line data={cpuUsageChart} options={options} />
      </div>
      <p>Total Memory: {totalMemory.toFixed(2)} GB</p>
      <p>Used Memory: {usedMemory.toFixed(2)} GB</p>
      <div>
        <Line data={memoryUsageChart} options={options} />
      </div>
      <div>
        <Line data={cpuUsageChart2} options={options2} />
      </div>
    </div>
  );
};

export default SystemInfo;
