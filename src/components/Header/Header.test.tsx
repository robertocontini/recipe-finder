import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";
import { useLocation } from "react-router-dom";

jest.mock("../../hooks/useFavorites", () => ({
  useFavorites: () => ({
    favorites: ["1", "2", "3"],
  }),
}));

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    ...originalModule,
    useLocation: jest.fn(),
  };
});

describe("Header", () => {
  it("renders Homepage button", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const homepageLink = screen.getByLabelText(/homepage/i);
    expect(homepageLink).toBeInTheDocument();
  });

  it("homepage anchor links to /", () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: "/" });

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const homepageLink = screen.getByLabelText(/homepage/i);
    expect(homepageLink).toHaveAttribute("href", "/");
  });

  it("renders favorites icon with correct badge count", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const favoritesLink = screen.getByRole("link", { name: /favorites/i });
    expect(favoritesLink).toBeInTheDocument();

    const badge = screen.getByText("3");
    expect(badge).toBeInTheDocument();
  });

  it("favorites button links to /favorites", () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: "/" });

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const favoritesLink = screen.getByRole("link", { name: /favorites/i });
    expect(favoritesLink).toHaveAttribute("href", "/favorites");
  });
});
