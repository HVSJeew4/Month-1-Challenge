import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./Input";

describe("Input", () => {
  describe("rendering", () => {
    it("renders with label and placeholder", () => {
      render(
        <Input
          label="Name"
          placeholder="Enter your name"
          required
          error="Required"
        />
      );
      const input = screen.getByLabelText(/name/i);
      expect(input).toHaveAttribute("placeholder", "Enter your name");
      expect(input).toHaveAttribute("aria-invalid", "true");
      const error = screen.getByRole("alert");
      expect(error).toHaveTextContent("Required");
    });

    it("supports different types", () => {
      render(<Input label="Email" type="email" />);
      const input = screen.getByLabelText(/email/i);
      expect(input).toHaveAttribute("type", "email");
    });
  });

  describe("interactions", () => {
    it("updates value on change and calls onChange", () => {
      const handleChange = jest.fn();
      render(
        <Input
          label="Name"
          value=""
          onChange={handleChange}
          placeholder="Enter"
        />
      );
      const input = screen.getByLabelText(/name/i) as HTMLInputElement;
      fireEvent.change(input, { target: { value: "Alice" } });
      expect(handleChange).toHaveBeenCalled();
    });

    it("handles focus and blur events", () => {
      const handleFocus = jest.fn();
      const handleBlur = jest.fn();
      render(
        <Input
          label="Name"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      );
      const input = screen.getByLabelText(/name/i);
      fireEvent.focus(input);
      fireEvent.blur(input);
      expect(handleFocus).toHaveBeenCalled();
      expect(handleBlur).toHaveBeenCalled();
    });
  });

  describe("edge cases", () => {
    it("handles undefined value without crashing", () => {
      render(<Input label="Optional" />);
      const input = screen.getByLabelText(/optional/i) as HTMLInputElement;
      expect(input.value).toBe("");
    });
  });
});

