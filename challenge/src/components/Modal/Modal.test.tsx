import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "./Modal";

describe("Modal", () => {
  describe("rendering", () => {
    it("does not render when closed", () => {
      render(
        <Modal isOpen={false} onClose={() => {}} title="My Modal">
          Content
        </Modal>
      );
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("renders with title and content when open", () => {
      render(
        <Modal isOpen onClose={() => {}} title="My Modal">
          <p>Content</p>
        </Modal>
      );
      expect(screen.getByRole("dialog", { name: /my modal/i })).toBeInTheDocument();
      expect(screen.getByText(/content/i)).toBeInTheDocument();
    });
  });

  describe("interactions", () => {
    it("calls onClose when backdrop is clicked", () => {
      const handleClose = jest.fn();
      render(
        <Modal isOpen onClose={handleClose} title="My Modal">
          Content
        </Modal>
      );
      fireEvent.click(screen.getByText(/content/i).closest(".modal-overlay")!);
      expect(handleClose).toHaveBeenCalled();
    });

    it("calls onClose when close button is clicked", () => {
      const handleClose = jest.fn();
      render(
        <Modal isOpen onClose={handleClose} title="My Modal">
          Content
        </Modal>
      );
      fireEvent.click(screen.getByRole("button", { name: /close/i }));
      expect(handleClose).toHaveBeenCalled();
    });
  });

  describe("edge cases", () => {
    it("closes on Escape key", () => {
      const handleClose = jest.fn();
      render(
        <Modal isOpen onClose={handleClose} title="My Modal">
          Content
        </Modal>
      );
      fireEvent.keyDown(document, { key: "Escape" });
      expect(handleClose).toHaveBeenCalled();
    });
  });
});

