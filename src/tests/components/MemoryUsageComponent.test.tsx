import React from "react";
import { render } from "@testing-library/react";
import MemoryUsageComponent from "@/components/SystemInfo/MemoryUsageComponent";
import { Line } from "react-chartjs-2";

jest.mock("react-chartjs-2", () => ({
  Line: jest.fn(() => null),
}));

describe("MemoryUsageComponent", () => {
  const mockMemoryUsageData = [10, 20, 30, 40];
  const mockOptions = { someOption: 1 };
  const mockTimeLabels = ["10:00", "11:00", "12:00", "13:00"];

  it("renders without crashing", () => {
    render(
      <MemoryUsageComponent
        memoryUsageData={mockMemoryUsageData}
        options={mockOptions}
        TIME_LABELS={mockTimeLabels}
      />
    );
  });

  it("passes correct data structure to Line component", () => {
    render(
      <MemoryUsageComponent
        memoryUsageData={mockMemoryUsageData}
        options={mockOptions}
        TIME_LABELS={mockTimeLabels}
      />
    );

    expect(Line).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          labels: mockTimeLabels,
          datasets: expect.arrayContaining([
            expect.objectContaining({
              data: mockMemoryUsageData,
              borderColor: "rgba(53, 162, 235, 0.8)",
              fill: false,
              borderWidth: 1,
              pointRadius: 0,
              tension: 0.5,
            }),
          ]),
        }),
        options: mockOptions,
      }),
      {}
    );
  });
});
