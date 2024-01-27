import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Layout from "@/components/Layout";
import Sidebar from "@/components/Sidebar";

// Mocking the Sidebar component
jest.mock("./Sidebar", () => {
  return function DummySidebar() {
    return <div data-testid='sidebar'>Sidebar content</div>;
  };
});

describe("Layout component", () => {
  it("renders the Sidebar and children content", () => {
    const testMessage = "Test Child";
    render(
      <Layout>
        <div>{testMessage}</div>
      </Layout>
    );

    // Check if Sidebar is rendered
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();

    // Check if children are rendered inside the main tag
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });
});
