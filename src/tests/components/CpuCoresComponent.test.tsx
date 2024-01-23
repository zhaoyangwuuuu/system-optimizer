import React from "react";
import { render } from "@testing-library/react";
import CpuCoresComponent from "@/components/SystemInfo/CpuCoresComponent";
import { Line } from "react-chartjs-2";

jest.mock("react-chartjs-2", () => ({
  Line: jest.fn(() => null),
}));

describe("CpuCoresComponent", () => {
  const mockCpuCoresData = [
    [10, 20, 30],
    [15, 25, 35],
  ];
  const mockOptions = { someOption: 1 };
  const mockTimeLabels = ["1s", "2s", "3s"];

  it("renders without crashing", () => {
    render(
      <CpuCoresComponent
        cpuCoresData={mockCpuCoresData}
        options={mockOptions}
        TIME_LABELS={mockTimeLabels}
      />
    );
  });

  it("passes correct data structure to Line component", () => {
    render(
      <CpuCoresComponent
        cpuCoresData={mockCpuCoresData}
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
              label: expect.any(String),
              data: expect.any(Array),
              borderColor: expect.any(String),
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
