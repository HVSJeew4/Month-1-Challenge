import { render, screen, fireEvent } from "@testing-library/react";
import { Tabs } from "./Tabs";

const tabs = [
  { label: "One", content: <p>First</p> },
  { label: "Two", content: <p>Second</p> },
  { label: "Three", content: <p>Third</p> },
];

describe("Tabs", () => {
  describe("rendering", () => {
    it("renders with default active tab", () => {
      render(<Tabs tabs={tabs} />);
      expect(screen.getByRole("tab", { name: /one/i })).toHaveAttribute(
        "aria-selected",
        "true"
      );
      expect(screen.getByText(/first/i)).toBeInTheDocument();
    });

    it("renders with custom defaultIndex", () => {
      render(<Tabs tabs={tabs} defaultIndex={1} />);
      expect(screen.getByRole("tab", { name: /two/i })).toHaveAttribute(
        "aria-selected",
        "true"
      );
      expect(screen.getByText(/second/i)).toBeInTheDocument();
    });
  });

  describe("interactions", () => {
    it("switches active tab on click and calls onChange with correct index", () => {
      const handleChange = jest.fn();
      render(<Tabs tabs={tabs} onChange={handleChange} />);

      const secondTab = screen.getByRole("tab", { name: /two/i });
      fireEvent.click(secondTab);

      expect(secondTab).toHaveAttribute("aria-selected", "true");
      expect(screen.getByText(/second/i)).toBeInTheDocument();
      expect(handleChange).toHaveBeenCalledWith(1);
    });
  });

  describe("edge cases", () => {
    it("handles empty tabs array gracefully", () => {
      render(<Tabs tabs={[]} />);
      expect(screen.queryByRole("tab")).not.toBeInTheDocument();
    });
  });
});

