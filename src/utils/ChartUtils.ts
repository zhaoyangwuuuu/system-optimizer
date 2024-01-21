import { fakerEN as faker } from "@faker-js/faker";
import { GetCpuCoreData } from "@/components/SystemInfo";
import { ProcessInfo } from "@/components/Processes";

export const generateMockMemoryUsage = () => {
  const total = 32;
  return total - faker.number.float({ min: 0, max: 32 });
};

const generateMockPercentage = () => {
  return faker.number.int({ min: 0, max: 100 });
};

export const generateMockCoresData = (numCores: number): GetCpuCoreData[] => {
  return Array.from({ length: numCores }, (_, index) => ({
    usage: generateMockPercentage(),
  }));
};

export const generateColor = (index: number) => {
  const hue = index * 137.508;
  return `hsl(${hue % 360}, 50%, 50%)`;
};

export const generateMockProesses = (numProcesses: number): ProcessInfo[] => {
  return Array.from({ length: numProcesses }, () => ({
    pid: faker.number.int({ min: 1000, max: 9999 }),
    name: faker.system.commonFileName(),
    cpu_usage: parseFloat(faker.number.float({ min: 0, max: 100 }).toFixed(2)),
  }));
};
