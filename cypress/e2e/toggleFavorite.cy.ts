/// <reference types="cypress" />
import { mockRecipe } from "../../src/mocks/recipe";

const { strMeal, idMeal } = mockRecipe;

describe("Toggle favorite on recipe detail page", () => {
  it("adds and removes a recipe from favorites", () => {
    cy.visit(`/recipe/${idMeal}`);

    cy.url().should("include", `/recipe/${idMeal}`);

    cy.get(`button[aria-label="Aggiungi ${strMeal} ai favoriti"]`).click();

    cy.get(`button[aria-label="Rimuovi ${strMeal} dai favoriti"]`).should("exist");

    cy.get(`button[aria-label="Rimuovi ${strMeal} dai favoriti"]`).click();

    cy.get(`button[aria-label="Aggiungi ${strMeal} ai favoriti"]`).should("exist");
  });
});
