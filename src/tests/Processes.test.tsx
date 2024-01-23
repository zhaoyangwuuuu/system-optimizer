import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import Processes from "@/components/Processes";
import configureMockStore from "redux-mock-store";
import "@testing-library/jest-dom";

const mockStore = configureMockStore();
const store = mockStore({
  refreshRate: { value: 1000 },
});

// TODO: more tests
describe("Processes Component", () => {
  it("renders the correct title", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <Processes />
      </Provider>
    );
    await waitFor(() => {
      expect(getByText("System Processes")).toBeInTheDocument();
    });
  });
});
