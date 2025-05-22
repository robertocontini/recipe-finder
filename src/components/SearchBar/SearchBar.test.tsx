import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

const renderComponent = (value = "", onChange = () => {}) => {
  return render(<SearchBar value={value} onChange={onChange} />);
};

describe("SearchBar", () => {
  it("renders the search input with correct label and aria-label", () => {
    renderComponent();

    const input = screen.getByLabelText(/cerca una ricetta per nome/i);
    expect(input).toBeInTheDocument();

    const label = screen.getByLabelText(/cerca ricetta/i);
    expect(label).toBeInTheDocument();
  });

  it("renders the search icon", () => {
    renderComponent();
    const icon = screen.getByTestId("SearchIcon");
    expect(icon).toBeInTheDocument();
  });

  it("shows the value passed as prop", () => {
    renderComponent("Portuguese");
    const input = screen.getByDisplayValue("Portuguese");
    expect(input).toBeInTheDocument();
  });

  it("calls onChange callback each time user types a character", () => {
    const handleChange = jest.fn();
    renderComponent("", handleChange);

    const input = screen.getByLabelText(/cerca una ricetta per nome/i);
    const value = "sardines";

    for (let i = 1; i <= value.length; i++) {
      fireEvent.change(input, { target: { value: value.slice(0, i) } });
    }

    expect(handleChange).toHaveBeenCalledTimes(value.length);
    expect(handleChange).toHaveBeenLastCalledWith(value);
  });
});
