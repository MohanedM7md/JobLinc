import { render, fireEvent } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import Searchbar from '../../components/NavigationBar/SearchBar';

describe('Searchbar Component', () => {
  test('renders the searchbar with placeholder text', () => {
    const { getByPlaceholderText } = render(<Searchbar />);
    const inputElement = getByPlaceholderText('Search');
    expect(inputElement).toBeInTheDocument();
  });

  test('focuses the input when the container is focused', () => {
    const { getByPlaceholderText, getByRole } = render(<Searchbar />);
    const container = getByRole('textbox').parentElement;
    const inputElement = getByPlaceholderText('Search');

    if (container) {
      fireEvent.focus(container);
    }

    expect(document.activeElement).toBe(inputElement);
  });

  test('renders the search icon', () => {
    const { container } = render(<Searchbar />);
    const iconElement = container.querySelector('.fa-magnifying-glass');
    expect(iconElement).toBeInTheDocument();
  });

  test('applies the correct class names to the input element', () => {
    const { getByPlaceholderText } = render(<Searchbar />);
    const inputElement = getByPlaceholderText('Search');
    expect(inputElement).toHaveClass('flex-grow text-black outline-none placeholder-gray-500');
  });

  test('does not crash when no props are provided', () => {
    const { container } = render(<Searchbar />);
    expect(container).toBeInTheDocument();
  });
});