import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

type ProcessInfo = {
  pid: number;
  name: string;
  cpu_usage: number;
};

const Processes: React.FC = () => {
  const [processes, setProcesses] = useState<ProcessInfo[]>([]);

  useEffect(() => {
    invoke<ProcessInfo[]>("get_processes")
      .then((data: ProcessInfo[]) => {
        setProcesses(data);
      })
      .catch((err) => console.error("Error fetching processes:", err));
  }, [processes]);
  console.log(processes);

  return <div></div>;
};

export default Processes;
