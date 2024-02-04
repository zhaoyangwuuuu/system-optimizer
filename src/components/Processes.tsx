import React, { useEffect, useState, useRef } from "react";
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
  const [selectedProcess, setSelectedProcess] = useState<ProcessInfo | null>(
    null
  );
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const actionMenuRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(event.target as Node)
      ) {
        setSelectedProcess(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProcessClick = (
    process: ProcessInfo,
    event: React.MouseEvent
  ) => {
    console.log("click");
    setSelectedProcess(process);
    setMenuPosition({ x: event.clientX, y: event.clientY });
  };

  const handleActionMenu = (action: string) => {
    console.log(`Action ${action} on process ${selectedProcess?.pid}`);
    if (!setSelectedProcess) return;

    if (action === "kill") {
      invoke("kill", {pid: selectedProcess?.pid})
      .then(() => {
        console.log(`Process ${selectedProcess?.pid} killed successfully`);
      })
      .catch((err) => {
        console.error(`Failed to kill process ${selectedProcess?.pid}:`, err);
      });
    }

    setSelectedProcess(null);
  };

  const ActionMenu = () => {
    return (
      <div
        ref={actionMenuRef}
        className='absolute bg-neutral-800 border border-gray-300 rounded shadow-lg '
        style={{ top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }}
      >
        <ul className='p-2'>
          <li
            className='cursor-pointer hover:bg-gray-100'
            onClick={() => handleActionMenu("kill")}
          >
            Kill
          </li>
          <li
            className='cursor-pointer hover:bg-gray-100'
            onClick={() => handleActionMenu("end")}
          >
            End
          </li>
          <li
            className='cursor-pointer hover:bg-gray-100'
            onClick={() => handleActionMenu("show_properties")}
          >
            Show Properties
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className='m-4'>
      <h2 className='text-xl font-bold mb-4'>System Processes</h2>
      <div className='flex flex-col gap-2'>
        {processes.map((process) => (
          <div
            key={process.pid}
            className='border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow'
            onClick={(event) => handleProcessClick(process, event)}
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
      {selectedProcess !== null && ActionMenu()}
    </div>
  );
};

export default Processes;
