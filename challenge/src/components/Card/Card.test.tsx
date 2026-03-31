import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

describe("Card", () => {
  describe("rendering", () => {
    it("renders with title and children", () => {
      render(
        <Card title="Card Title">
          <p>Body</p>
        </Card>
      );
      expect(screen.getByText(/card title/i)).toBeInTheDocument();
      expect(screen.getByText(/body/i)).toBeInTheDocument();
    });

    it("renders image and actions", () => {
      render(
        <Card
          title="Card"
          image="https://example.com/img.png"
          actions={<button>Action</button>}
        >
          Content
        </Card>
      );
      const img = screen.getByRole("img");
      expect(img).toHaveAttribute("src", "https://example.com/img.png");
      expect(screen.getByRole("button", { name: /action/i })).toBeInTheDocument();
    });
  });

  describe("interactions", () => {
    it("is purely presentational (no built-in interactions)", () => {
      render(<Card>Content</Card>);
      expect(screen.getByText(/content/i)).toBeInTheDocument();
    });
  });

  describe("edge cases", () => {
    it("handles missing title and image", () => {
      render(<Card>Content</Card>);
      expect(screen.getByText(/content/i)).toBeInTheDocument();
    });
  });
});

