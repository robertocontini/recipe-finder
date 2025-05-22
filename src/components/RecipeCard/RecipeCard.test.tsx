import { render, screen } from "@testing-library/react";
import RecipeCard from "./RecipeCard";
import { BrowserRouter } from "react-router-dom";
import { mockRecipe } from "src/mocks/recipe";

const renderComponent = (
  isFavorite = false,
  isAboveTheFold = true,
  onToggleFavorite = jest.fn()
) => {
  return render(
    <BrowserRouter>
      <RecipeCard
        recipe={mockRecipe}
        isFavorite={isFavorite}
        isAboveTheFold={isAboveTheFold}
        onToggleFavorite={onToggleFavorite}
      />
    </BrowserRouter>
  );
};

describe("RecipeCard", () => {
  it("renders the recipe title", () => {
    renderComponent();
    expect(screen.getByText(mockRecipe.strMeal)).toBeInTheDocument();
  });

  it("renders the recipe title as a link", () => {
    renderComponent();
    const link = screen.getByRole("link", {
      name: `Vai alla ricetta ${mockRecipe.strMeal}`,
    });
    expect(link).toHaveAttribute("href", `/recipe/${mockRecipe.idMeal}`);
  });

  it("renders the image with correct src, alt and eager loading", () => {
    renderComponent();
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", mockRecipe.strMealThumb);
    expect(img).toHaveAttribute("alt", mockRecipe.strMeal);
    expect(img).toHaveAttribute("loading", "eager");
  });

  it("renders the image with lazy loading when not above the fold", () => {
    renderComponent(false, false);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("loading", "lazy");
  });
});
