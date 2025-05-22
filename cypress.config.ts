import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // <-- your dev server URL here
    specPattern: "cypress/e2e/**/*.cy.{ts,tsx}",
  },
});
