'use client';

import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api';

export default function Home() {
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState({total: 0, used: 0});

  useEffect(() => {
    // Fetch CPU usage
    invoke<number>('get_cpu_usage')
      .then((cpuLoad) => setCpuUsage(cpuLoad))
      .catch(console.error);

    // Fetch memory usage
    invoke<[number, number]>('get_memory_usage')
      .then(([total, used]) => setMemoryUsage({ total, used }))
      .catch(console.error);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <p>CPU Usage: {cpuUsage.toFixed(2)}%</p>
        <p>Total Memory: {memoryUsage.total} KB</p>
        <p>Used Memory: {memoryUsage.used} KB</p>
      </div>
    </main>
  )
}
