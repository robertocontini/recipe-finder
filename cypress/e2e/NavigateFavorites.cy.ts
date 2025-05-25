/// <reference types="cypress" />
import { mockRecipe } from "../../src/mocks/recipe";

const { strMeal, idMeal } = mockRecipe;

describe("Favorites page", () => {
  it("add to favorites and check favorites page on toggle", () => {
    cy.visit(`/recipe/${idMeal}`);

    cy.get(`button[aria-label="Aggiungi ${strMeal} ai favoriti"]`).click();

    cy.get('a[aria-label="Favorites"]').click();

    cy.url().should("include", "/favorites");

    cy.get(".MuiBadge-badge")
      .should("exist")
      .invoke("text")
      .should("equal", "1");

    cy.get(`[aria-label="Vai alla ricetta ${strMeal}"]`).should("exist");

    cy.wait(100);

    cy.get(`button[aria-label="Rimuovi ${strMeal} dai favoriti"]`).click();

    cy.get(`[aria-label="Vai alla ricetta ${strMeal}"]`).should("not.exist");

    cy.get("h1").contains("Non hai ricette salvate nei favoriti");

    cy.get(".MuiBadge-badge").should("not.be.visible");

    cy.get("a").contains("Torna alla home").click();

    cy.url().should("include", "/");
  });
});
