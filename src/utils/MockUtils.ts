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

const ProcessNames = Array.from({ length: 50 }, () =>
  faker.system.commonFileName()
);

export const generateMockProesses = (numProcesses: number): ProcessInfo[] => {
  return ProcessNames.slice(0, numProcesses).map((name) => ({
    pid: faker.number.int({ min: 1000, max: 9999 }),
    name,
    cpu_usage: parseFloat(faker.number.float({ min: 0, max: 100 }).toFixed(2)),
  }));
};
