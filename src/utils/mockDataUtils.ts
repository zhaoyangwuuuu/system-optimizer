import { fakerEN as faker } from "@faker-js/faker";

export const generateMockCpuUsage = () => {
  return faker.number.int({ min: 0, max: 100 });
};

export const generateMockMemoryUsage = () => {
  const total = 32;
  return total - faker.number.float({ min: 0, max: 32 });
};

export const generateMockCoresData = (numCores: number) => {
  return Array.from({ length: numCores }, () => ({
    usage: faker.number.int({ min: 0, max: 100 }),
  }));
};
