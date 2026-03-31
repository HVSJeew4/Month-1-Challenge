import { render, screen, fireEvent } from "@testing-library/react";
import { Dropdown } from "./Dropdown";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
];

describe("Dropdown", () => {
  describe("rendering", () => {
    it("renders placeholder when no value is selected", () => {
      render(
        <Dropdown
          label="Framework"
          items={items}
          placeholder="Choose..."
        />
      );
      expect(screen.getByText("Choose...")).toBeInTheDocument();
      const trigger = screen.getByRole("combobox", { name: /framework/i });
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    it("renders selected item label when value is provided", () => {
      render(
        <Dropdown
          label="Framework"
          items={items}
          value="vue"
        />
      );
      expect(screen.getByText("Vue")).toBeInTheDocument();
    });
  });

  describe("interactions", () => {
    it("opens and closes on click, selects an option, and calls onChange", () => {
      const handleChange = jest.fn();
      render(
        <Dropdown
          label="Framework"
          items={items}
          onChange={handleChange}
          placeholder="Choose..."
        />
      );
      const trigger = screen.getByRole("combobox", { name: /framework/i });
      fireEvent.click(trigger);
      const option = screen.getByRole("option", { name: "React" });
      fireEvent.click(option);
      expect(handleChange).toHaveBeenCalledWith("react");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("supports keyboard navigation and selection", () => {
      const handleChange = jest.fn();
      render(
        <Dropdown
          label="Framework"
          items={items}
          onChange={handleChange}
        />
      );
      const trigger = screen.getByRole("combobox", { name: /framework/i });

      // Open with Enter, cycle with ArrowDown, select with Enter
      fireEvent.keyDown(trigger, { key: "Enter" });
      expect(screen.getByRole("listbox")).toBeInTheDocument();
      fireEvent.keyDown(trigger, { key: "ArrowDown" });
      fireEvent.keyDown(trigger, { key: "Enter" });

      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe("edge cases", () => {
    it("closes when Escape is pressed", () => {
      render(
        <Dropdown
          label="Framework"
          items={items}
        />
      );
      const trigger = screen.getByRole("combobox", { name: /framework/i });
      fireEvent.keyDown(trigger, { key: "Enter" });
      expect(screen.getByRole("listbox")).toBeInTheDocument();
      fireEvent.keyDown(trigger, { key: "Escape" });
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });
});

