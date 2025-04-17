import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavIcon from "../../components/NavigationBar/NavIcon"; // Adjust the path as needed
import "@testing-library/jest-dom";

describe("NavIcon Component", () => {
  const defaultProps = {
    rightBorder: "border-right",
    Icon: "fa-solid fa-home",
    Name: "Home",
    Dropdown: "fa-solid fa-chevron-down",
    pagePath: "/home",
  };

  const renderWithRouter = (props: any) =>
    render(
      <BrowserRouter>
        <NavIcon {...props} />
      </BrowserRouter>
    );

  it("renders the name correctly", () => {
    renderWithRouter(defaultProps);

    const nameElement = screen.getByText(defaultProps.Name);
    expect(nameElement).toBeInTheDocument();
  });

  it("does not render the dropdown icon when not provided", () => {
    renderWithRouter({ ...defaultProps, Dropdown: undefined });

    
    const dropdownElement = document.querySelector(`.${defaultProps.Dropdown}`);
    expect(dropdownElement).not.toBeInTheDocument();
  });

  it("links to the correct path", () => {
    renderWithRouter(defaultProps);

   
    const linkElement = screen.getByRole("link", { name: defaultProps.Name });
    expect(linkElement).toHaveAttribute("href", defaultProps.pagePath);
  });

  it("applies the correct CSS classes for styling", () => {
    renderWithRouter(defaultProps);

    const linkElement = screen.getByRole("link", { name: defaultProps.Name });
    expect(linkElement).toHaveClass(
      `group flex flex-col items-center justify-center w-[calc(100%/7)] sm:w-1/2 cursor-pointer ${defaultProps.rightBorder}`
    );
  });
});