/// <reference types="cypress" />
import { mockRecipe } from "../../src/mocks/recipe";

const { strMeal, idMeal } = mockRecipe;

describe("Text search", () => {
  it("displays recipes matching the text search", () => {
    cy.visit("/");

    cy.get('input[aria-label="Cerca una ricetta per nome"]').type(strMeal);

    cy.contains(strMeal).should("exist");
  });

  it("navigates to recipe details page on recipe click", () => {
    cy.visit("/");

    cy.get('input[aria-label="Cerca una ricetta per nome"]').type(strMeal);

    cy.contains(strMeal).click();

    cy.url().should("include", `/recipe/${idMeal}`);
  });
});
