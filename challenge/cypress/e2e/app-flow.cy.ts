describe("Hearts Component Library - user flow", () => {
  it("navigates the demo and interacts with multiple components", () => {
    cy.visit("/");

    // Button: primary click increments counter text
    cy.contains("button", /Primary/).click();

    // Modal: open and close with Escape
    cy.contains("button", "Open Modal").click();
    cy.findByRole("dialog", { name: /example modal/i }).should("exist");
    cy.realPress("Escape");
    cy.findByRole("dialog", { name: /example modal/i }).should("not.exist");

    // Dropdown: select a framework and verify text
    cy.findByRole("combobox", { name: /framework/i }).click();
    cy.findByRole("option", { name: "React" }).click();
    cy.contains("Selected: react").should("exist");

    // Toggle: dark mode on/off text updates
    cy.findByRole("switch", { name: /dark mode/i }).click();
    cy.contains("Dark mode: ON").should("exist");
  });
});

