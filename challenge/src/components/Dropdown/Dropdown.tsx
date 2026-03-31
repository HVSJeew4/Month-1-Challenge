import React, { useEffect, useId, useRef, useState } from "react";

interface DropdownItem {
  value: string;
  label: string;
}

interface DropdownProps {
  items: DropdownItem[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export function Dropdown({
  items,
  value,
  onChange,
  placeholder = "Select...",
  label,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const dropdownLabelId = useId();
  const selectedIndex = items.findIndex((item) => item.value === value);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectedItem = items.find((item) => item.value === value);

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const openDropdown = () => {
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setIsOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (itemValue: string) => {
    onChange?.(itemValue);
    closeDropdown();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const hasItems = items.length > 0;

    if (e.key === "Escape") {
      e.preventDefault();
      closeDropdown();
      return;
    }

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!isOpen) {
        openDropdown();
        return;
      }
      if (!hasItems) return;
      const itemAtActive = items[activeIndex];
      if (itemAtActive) handleSelect(itemAtActive.value);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) openDropdown();
      if (!hasItems) return;
      setActiveIndex((i) => (i + 1) % items.length);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!isOpen) openDropdown();
      if (!hasItems) return;
      setActiveIndex((i) => (i - 1 + items.length) % items.length);
      return;
    }
  };

  return (
    <div className="dropdown" ref={ref}>
      {label && (
        <span id={dropdownLabelId} className="dropdown-label">
          {label}
        </span>
      )}
      <div
        className={`dropdown-trigger ${isOpen ? "dropdown-open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={label ? dropdownLabelId : undefined}
        tabIndex={0}
      >
        {selectedItem ? selectedItem.label : placeholder}
      </div>
      {isOpen && (
        <ul className="dropdown-menu" role="listbox">
          {items.map((item) => (
            <li
              key={item.value}
              className={`dropdown-item ${item.value === value ? "dropdown-item-selected" : ""}`}
              onClick={() => handleSelect(item.value)}
              role="option"
              aria-selected={item.value === value}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
