import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

const renderComponent = () => {
  return render(<Loader />);
};

describe("Loader", () => {
  it("renders full screen overlay", () => {
    renderComponent();

    const overlay = screen.getByLabelText("loading-overlay");

    expect(overlay).toHaveStyle({
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
    });

    expect(overlay).toBeVisible();
  });
});
