import { render, screen, fireEvent } from "@testing-library/react";
import { App } from "../../src/App";

describe("App integration", () => {
  it("updates click count when primary button is clicked", () => {
    render(<App />);
    const button = screen.getByRole("button", { name: /primary \(clicked 0x\)/i });
    fireEvent.click(button);
    expect(
      screen.getByRole("button", { name: /primary \(clicked 1x\)/i })
    ).toBeInTheDocument();
  });

  it("opens and closes the modal", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /open modal/i }));
    expect(
      screen.getByRole("dialog", { name: /example modal/i })
    ).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(
      screen.queryByRole("dialog", { name: /example modal/i })
    ).not.toBeInTheDocument();
  });

  it("selects a dropdown value and toggles dark mode", () => {
    render(<App />);
    const combobox = screen.getByRole("combobox", { name: /framework/i });
    fireEvent.click(combobox);
    fireEvent.click(screen.getByRole("option", { name: "React" }));
    expect(screen.getByText(/selected: react/i)).toBeInTheDocument();

    const toggle = screen.getByRole("switch", { name: /dark mode/i });
    fireEvent.click(toggle);
    expect(screen.getByText(/dark mode: on/i)).toBeInTheDocument();
  });
});

