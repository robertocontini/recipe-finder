import { render, screen, fireEvent } from "@testing-library/react";
import FavoriteButton from "./FavoriteButton";
import { mockRecipe } from "src/mocks/recipe";

const renderComponent = (isFavorite = false, onToggleFavorite = jest.fn()) => {
  return render(
    <FavoriteButton
      recipe={mockRecipe}
      isFavorite={isFavorite}
      onToggleFavorite={onToggleFavorite}
    />
  );
};

describe("FavoriteButton", () => {
  it("shows outlined heart icon when not favorites", () => {
    renderComponent();

    expect(
      screen.getByLabelText(`Aggiungi ${mockRecipe.strMeal} ai favoriti`)
    ).toBeInTheDocument();
    expect(screen.getByTestId("FavoriteBorderIcon")).toBeInTheDocument();
  });

  it("shows filled heart icon when in favorites", () => {
    renderComponent(true);

    expect(
      screen.getByLabelText(`Rimuovi ${mockRecipe.strMeal} dai favoriti`)
    ).toBeInTheDocument();
    expect(screen.getByTestId("FavoriteIcon")).toBeInTheDocument();
  });

  it("calls onToggleFavorite when heart icon is clicked", () => {
    const onToggleFavorite = jest.fn();
    renderComponent(true, onToggleFavorite);

    const button = screen.getByRole("button", {
      name: `Rimuovi ${mockRecipe.strMeal} dai favoriti`,
    });

    fireEvent.click(button);

    expect(onToggleFavorite).toHaveBeenCalledTimes(1);
    expect(onToggleFavorite).toHaveBeenCalledWith(mockRecipe.idMeal);
  });

  it("renders the filled heart icon when isFavorite becomes true", () => {
    const { rerender } = renderComponent();

    rerender(
      <FavoriteButton
        recipe={mockRecipe}
        isFavorite={true}
        onToggleFavorite={jest.fn()}
      />
    );

    expect(screen.getByTestId("FavoriteIcon")).toBeInTheDocument();
    expect(
      screen.getByLabelText(`Rimuovi ${mockRecipe.strMeal} dai favoriti`)
    ).toBeInTheDocument();
  });
});
