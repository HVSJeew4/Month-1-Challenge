import { render, screen, fireEvent } from "@testing-library/react";
import { Toggle } from "./Toggle";

describe("Toggle", () => {
  describe("rendering", () => {
    it("renders with label", () => {
      render(<Toggle label="Dark mode" />);
      expect(screen.getByText(/dark mode/i)).toBeInTheDocument();
      expect(screen.getByRole("switch")).toHaveAttribute("aria-label", "Dark mode");
    });

    it("respects disabled prop", () => {
      render(<Toggle label="Disabled" disabled />);
      const toggle = screen.getByRole("switch");
      expect(toggle).toHaveAttribute("tabindex", "-1");
    });
  });

  describe("interactions", () => {
    it("toggles internal state on click when uncontrolled", () => {
      render(<Toggle label="Dark mode" />);
      const toggle = screen.getByRole("switch");

      expect(toggle).toHaveAttribute("aria-checked", "false");
      fireEvent.click(toggle);
      expect(toggle).toHaveAttribute("aria-checked", "true");
    });

    it("calls onChange with new value when controlled", () => {
      const handleChange = jest.fn();
      render(<Toggle label="Dark mode" checked={false} onChange={handleChange} />);
      const toggle = screen.getByRole("switch");

      fireEvent.click(toggle);
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it("does not respond when disabled", () => {
      const handleChange = jest.fn();
      render(<Toggle label="Dark mode" disabled onChange={handleChange} />);
      const toggle = screen.getByRole("switch");

      fireEvent.click(toggle);
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("edge cases", () => {
    it("handles missing onChange without errors", () => {
      render(<Toggle label="Dark mode" checked={false} />);
      const toggle = screen.getByRole("switch");
      fireEvent.click(toggle);
    });
  });
});

