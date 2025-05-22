/// <reference types="cypress" />
import { mockRecipe } from "../../src/mocks/recipe";

const { strMeal, idMeal } = mockRecipe;

describe("Search and toggle favorite E2E", () => {
  it("navigates to recipe details and toggles favorite", () => {
    cy.visit("/");

    cy.get(".MuiBadge-badge")
      .should("exist")
      .invoke("text")
      .should("equal", "");

    cy.get('input[aria-label="Cerca una ricetta per nome"]')
      .should("exist")
      .type(strMeal);

    cy.contains(strMeal).should("exist").click();

    cy.url().should("include", `/recipe/${idMeal}`);

    cy.get(`button[aria-label="Aggiungi ${strMeal} ai favoriti"]`).click();

    cy.get(`button[aria-label="Rimuovi ${strMeal} dai favoriti"]`).should(
      "exist"
    );

    cy.get(".MuiBadge-badge")
      .should("exist")
      .invoke("text")
      .should("equal", "1");
  });
});

export {};
