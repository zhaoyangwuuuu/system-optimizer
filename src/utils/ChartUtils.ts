import { fakerEN as faker } from "@faker-js/faker";
import { GetCpuCoreData } from "@/components/SystemInfo";

export const generateMockMemoryUsage = () => {
  const total = 32;
  return total - faker.number.float({ min: 0, max: 32 });
};

const generateMockCoreData = () => {
  return faker.number.int({ min: 0, max: 100 });
};

export const generateMockCoresData = (numCores: number): GetCpuCoreData[] => {
  return Array.from({ length: numCores }, (_, index) => ({
    usage: generateMockCoreData(),
  }));
};

export const generateColor = (index: number) => {
  const hue = index * 137.508;
  return `hsl(${hue % 360}, 50%, 50%)`;
};
