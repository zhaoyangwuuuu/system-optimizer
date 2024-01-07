import React, { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

const SystemInfo: React.FC = () => {
  const [cpuUsage, setCpuUsage] = useState<number>(0);
  const [memoryUsage, setMemoryUsage] = useState<{ total: number, used: number }>({ total: 0, used: 0 });

  useEffect(() => {
    console.log('useEffect begin');
    const intervalId = setInterval(() => {
      invoke<number>('get_cpu_usage')
        .then((usage) => setCpuUsage(usage))
        .catch(console.error);

      invoke<[number, number]>('get_memory_usage')
        .then(([total, used]) => setMemoryUsage({ total, used }))
        .catch(console.error);

      console.log('useEffect end', cpuUsage, memoryUsage);
    }, 1000);


    return () => clearInterval(intervalId);
  }, [cpuUsage, memoryUsage]);

  return (
    <div>
      <h3>System Information</h3>
      <p>CPU Usage: {cpuUsage.toFixed(2)}%</p>
      <p>Total Memory: {memoryUsage.total.toFixed(2)} KB</p>
      <p>Used Memory: {memoryUsage.used.toFixed(2)} KB</p>
    </div>
  );
};

export default SystemInfo;
