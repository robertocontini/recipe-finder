import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";
import { useLocation } from "react-router-dom";

// Mock useFavorites
jest.mock("../../hooks/useFavorites", () => ({
  useFavorites: () => ({
    favorites: ["item1", "item2"],
  }),
}));

// Mock di useLocation da react-router-dom per testare il current path
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    ...originalModule,
    useLocation: jest.fn(),
  };
});


describe("Header", () => {
  it("renders Homepage button with underline when path is '/'", () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: "/" });

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const homepageButton = screen.getByRole("link", { name: /recipe finder/i });
    expect(homepageButton).toBeInTheDocument();
    expect(homepageButton).toHaveStyle("text-decoration: underline");
    expect(homepageButton).toHaveStyle("font-weight: 700");
  });

  it("renders Homepage button without underline when path is not '/'", () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: "/favorites" });

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const homepageButton = screen.getByRole("link", { name: /recipe finder/i });
    expect(homepageButton).toBeInTheDocument();
    expect(homepageButton).toHaveStyle("text-decoration: none");
  });

  it("renders favorites icon with correct badge count", () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: "/" });

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const favoritesButton = screen.getByRole("link", { name: /favorites/i });
    expect(favoritesButton).toBeInTheDocument();

    const badge = screen.getByText("2"); // badgeContent = favorites.length = 2
    expect(badge).toBeInTheDocument();
  });

  it("favorites button links to /favorites", () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: "/" });

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const favoritesButton = screen.getByRole("link", { name: /favorites/i });
    expect(favoritesButton).toHaveAttribute("href", "/favorites");
  });
});
