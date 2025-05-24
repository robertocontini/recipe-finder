/// <reference types="cypress" />
import { mockRecipe } from "../../src/mocks/recipe";

const { strMeal, idMeal } = mockRecipe;

describe("Favorites Page E2E", () => {
  it("adds a recipe to favorites, navigates to favorites, removes recipe, and updates badge", () => {
    // Visita home
    cy.visit("/");

    // Cerca la ricetta
    cy.get('input[aria-label="Cerca una ricetta per nome"]').type(strMeal);

    // Click sulla ricetta
    cy.contains(strMeal).should("exist").click();

    // Verifica URL dettagli
    cy.url().should("include", `/recipe/${idMeal}`);

    // Aggiungi ai favoriti
    cy.get(`button[aria-label="Aggiungi ${strMeal} ai favoriti"]`).click();

    // Conferma che sia stato aggiunto
    cy.get(`button[aria-label="Rimuovi ${strMeal} dai favoriti"]`).should("exist");

    // Naviga alla pagina preferiti
    cy.get('a[aria-label="Favorites"]').click();

    // Verifica URL
    cy.url().should("include", "/favorites");

    // Verifica badge = 1
    cy.get(".MuiBadge-badge")
      .should("exist")
      .invoke("text")
      .should("equal", "1");

    // Ricetta presente
    cy.contains(strMeal).should("exist");

    // Rimuovi dai favoriti
    cy.get(`button[aria-label="Rimuovi ${strMeal} dai favoriti"]`).click();

    // Ricetta non più presente
    cy.contains(strMeal).should("not.exist");

    // Badge aggiornato (vuoto o 0)
    cy.get(".MuiBadge-badge")
      .invoke("text")
      .should("match", /^$|^0$/);
  });
});

export {};
