import DarkMode from '@pages/Settings/AccountPreferences/Display/DarkMode';
import { it, expect, describe, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeContext, ThemeProvider } from '@context/ThemeProvider';


describe("DarkMode", () => {

    beforeAll(() => {
        Object.defineProperty(window, "matchMedia", {
          writable: true,
          value: vi.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
          })),
        });
      });

    it("should render a Dark mode heading tag", () => {
        render(
            <MemoryRouter>
                <DarkMode />
            </MemoryRouter>
            );
        const heading = screen.getByRole("heading");
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent(/dark mode/i);
    });

    it("should render 2 options one for dark mode and one for light mode", () => {
        render(
            <MemoryRouter>
                <DarkMode />
            </MemoryRouter>
            );
        const inputs = screen.getAllByRole("radio");
        const labelLight = screen.getByText(/always off/i);
        const labelDark = screen.getByText(/always on/i);

        expect(inputs[0]).toBeInTheDocument();
        expect(inputs[1]).toBeInTheDocument();
        expect(labelLight).toBeInTheDocument();
        expect(labelDark).toBeInTheDocument();
    });

    it ("should change the theme in localStorage upon clicking on always off or always on", () => {
        
        render(
            <MemoryRouter>
                <ThemeProvider>
                    <DarkMode />
                </ThemeProvider>
            </MemoryRouter>
            );
        const labelLight = screen.getByText(/always off/i);
        const labelDark = screen.getByText(/always on/i);
        
        fireEvent.click(labelLight);
        expect(localStorage.getItem("theme")).toBe("dark");
        fireEvent.click(labelDark);
        expect(localStorage.getItem("theme")).toBe("light");

    });


});