import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import SystemInfo from "@/components/SystemInfo";
import configureMockStore from "redux-mock-store";
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { ChartConfiguration, ChartType } from "chart.js";

window.addEventListener = jest.fn();
window.removeEventListener = jest.fn();

jest.mock("chart.js/auto", () => ({
  Chart: class {
    context: CanvasRenderingContext2D | null;
    options: ChartConfiguration<ChartType>;

    constructor(
      context: CanvasRenderingContext2D | null,
      options: ChartConfiguration<ChartType>
    ) {
      this.context = context;
      this.options = options;
    }
    update() {}
    destroy() {}
  },
  registerables: [],
}));

const mockStore = configureMockStore();
const store = mockStore({
  refreshRate: { value: 1000 },
});

describe("SystemInfo Component", () => {
  it("renders the correct title", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <SystemInfo />
      </Provider>
    );
    await waitFor(() => {
      expect(getByText(/Memory Usage:/i)).toBeInTheDocument();
    });
  });
});

afterEach(cleanup);
