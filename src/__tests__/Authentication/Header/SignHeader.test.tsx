import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import SignHeader from '../../../components/Authentication/Headers/SignHeader';
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(), // mock useNavigate
  };
});

describe('SignHeader component', () => {
  it('renders successfully', () => {
    render(
      <BrowserRouter>
        <SignHeader />
      </BrowserRouter>
    );
    const header = screen.getByTestId('header-test');
    expect(header).toBeInTheDocument();
  });


});
