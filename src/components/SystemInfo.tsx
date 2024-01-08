import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const SystemInfo: React.FC = () => {
  const [cpuUsage, setCpuUsage] = useState<number>(0);
  const [cpuUsageData, setCpuUsageData] = useState<number[]>([]);

  const [totalMemory, setTotalMemory] = useState<number>(0);
  const [usedMemory, setUsedMemory] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      invoke<number>("get_cpu_usage")
        .then((usage) => setCpuUsage(usage))
        .catch(console.error);

      invoke<[number, number]>("get_memory_usage")
        .then(([total, used]) => {
          setTotalMemory(total / (1024 * 1024 * 1024));
          setUsedMemory(used / (1024 * 1024 * 1024));
        })
        .catch(console.error);
    }, 1000);

    setCpuUsageData((currentData) => [...currentData, cpuUsage].slice(-30));
    return () => clearInterval(intervalId);
  }, [cpuUsage, totalMemory, usedMemory]);

  // const cpuUsageChart = {
  //   labels: Array(30).fill(""),
  //   datasets: [
  //     {
  //       label: "CPU Usage (%)",
  //       data: cpuUsageData,
  //       backgroundColor: "rgba(53, 162, 235, 0.5)",
  //       borderColor: "rgba(53, 162, 235, 0.8)",
  //       borderWidth: 1,
  //     },
  //   ],
  // };
  const timeLabels = cpuUsageData.map((_, index) => `${index}s`);

  const cpuUsageChart = {
    labels: timeLabels,
    datasets: [
      {
        label: "CPU Usage (%)",
        data: cpuUsageData,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgba(53, 162, 235, 0.8)",
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

  return (
    <div>
      <h3>System Information</h3>
      <p>CPU Usage: {cpuUsage.toFixed(2)}%</p>
      <div>
        <Line data={cpuUsageChart} options={options} />
      </div>
      <p>Total Memory: {totalMemory.toFixed(2)} GB</p>
      <p>Used Memory: {usedMemory.toFixed(2)} GB</p>
    </div>
  );
};

export default SystemInfo;
