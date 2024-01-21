import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { generateMockProesses } from "@/utils/MockUtils";
const __DEBUG__ = process.env.NEXT_PUBLIC_DEBUG_MODE || false;

export type ProcessInfo = {
  pid: number;
  name: string;
  cpu_usage: number;
};

const Processes: React.FC = () => {
  const [processes, setProcesses] = useState<ProcessInfo[]>([]);

  useEffect(() => {
    const fetchProcesses = () => {
      if (__DEBUG__) {
        let mockProcesses = generateMockProesses(15);
        setProcesses(mockProcesses);
      } else {
        invoke<ProcessInfo[]>("get_processes")
          .then((data: ProcessInfo[]) => {
            setProcesses(data);
          })
          .catch((err) => console.error("Error fetching processes:", err));
      }
    };

    fetchProcesses();
    const interval = setInterval(fetchProcesses, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='m-4'>
      <h2 className='text-xl font-bold mb-4'>System Processes</h2>
      <div className='flex flex-col gap-2'>
        {processes.map((process) => (
          <div
            key={process.pid}
            className='border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow'
          >
            <p className='font-semibold'>
              Process ID: <span className='font-normal'>{process.pid}</span>
            </p>
            <p className='font-semibold'>
              Name: <span className='font-normal'>{process.name}</span>
            </p>
            <p className='font-semibold'>
              CPU Usage:{" "}
              <span className='font-normal'>{process.cpu_usage}%</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Processes;
