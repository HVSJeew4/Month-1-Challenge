import { render, screen, fireEvent } from "@testing-library/react";
import { Alert } from "./Alert";

describe("Alert", () => {
  describe("rendering", () => {
    it("renders content with default variant", () => {
      render(<Alert>Info message</Alert>);
      const alert = screen.getByText(/info message/i).closest(".alert")!;
      expect(alert.className).toContain("alert-info");
    });

    it("renders with custom variant", () => {
      render(<Alert variant="error">Error</Alert>);
      const alert = screen.getByText(/error/i).closest(".alert")!;
      expect(alert.className).toContain("alert-error");
    });
  });

  describe("interactions", () => {
    it("dismisses when dismiss button is clicked and calls onDismiss", () => {
      const handleDismiss = jest.fn();
      render(
        <Alert variant="success" dismissible onDismiss={handleDismiss}>
          Done
        </Alert>
      );
      const button = screen.getByRole("button", { name: /dismiss alert/i });
      fireEvent.click(button);
      expect(screen.queryByText(/done/i)).not.toBeInTheDocument();
      expect(handleDismiss).toHaveBeenCalled();
    });
  });

  describe("edge cases", () => {
    it("handles non-dismissible alerts without dismiss button", () => {
      render(<Alert>Plain</Alert>);
      expect(screen.queryByRole("button", { name: /dismiss alert/i })).toBeNull();
    });
  });
});

