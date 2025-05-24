/// <reference types="cypress" />
import { mockRecipe } from "../../src/mocks/recipe";

const { strMeal, idMeal } = mockRecipe;

describe("Text search", () => {
  it("search for recipe, and go to the detail page ", () => {
    cy.visit("/");

    cy.get('input[aria-label="Cerca una ricetta per nome"]').type(strMeal);

    cy.contains(strMeal).should("exist");

    cy.contains(strMeal).click();

    cy.url().should("include", `/recipe/${idMeal}`);
  });
});
