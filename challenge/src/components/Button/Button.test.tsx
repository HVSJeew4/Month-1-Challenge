import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  describe("rendering", () => {
    it("renders with correct text", () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
    });

    it("applies variant styles and custom className", () => {
      render(
        <Button variant="danger" className="extra-class">
          Danger
        </Button>
      );
      const button = screen.getByRole("button", { name: /danger/i });
      expect(button.className).toContain("btn-danger");
      expect(button.className).toContain("extra-class");
    });

    it("shows loading state instead of children", () => {
      render(<Button loading>Save</Button>);
      expect(screen.getByText(/loading.../i)).toBeInTheDocument();
      expect(screen.queryByText(/save/i)).not.toBeInTheDocument();
    });
  });

  describe("interactions", () => {
    it("handles click events when enabled", () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click</Button>);
      fireEvent.click(screen.getByRole("button", { name: /click/i }));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when disabled", () => {
      const handleClick = jest.fn();
      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>
      );
      const button = screen.getByRole("button", { name: /disabled/i });
      expect(button).toBeDisabled();
      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("edge cases", () => {
    it("handles missing onClick without errors", () => {
      render(<Button>Click</Button>);
      fireEvent.click(screen.getByRole("button", { name: /click/i }));
    });
  });
});

