import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import SystemInfo from "@/components/SystemInfo";
import configureMockStore from "redux-mock-store";
import "@testing-library/jest-dom";

window.addEventListener = jest.fn();
window.removeEventListener = jest.fn();

// TODO: fix erros
// jest.mock("chart.js/auto", () => ({
//   Chart: class {
//     constructor() {
//       this.canvas = document.createElement("canvas");
//       this.ctx = this.canvas.getContext("2d");
//     }
//     update() {}
//     destroy() {}
//   },
// }));

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
