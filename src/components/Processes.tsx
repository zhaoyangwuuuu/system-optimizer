import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { generateMockProesses } from "../utils/ChartUtils";
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
  console.log(processes);

  return <div></div>;
};

export default Processes;
