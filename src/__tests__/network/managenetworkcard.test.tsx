import { render, screen } from '@testing-library/react';
import ManageNetworkCard from '../../components/MyNetwork/ManageNetworkCard';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

describe('ManageNetworkCard Component', () => {
  it('renders the title', () => {
    render(
      <BrowserRouter>
        <ManageNetworkCard />
      </BrowserRouter>
    );
    expect(screen.getByText('Manage my network')).toBeInTheDocument();
  });

  it('renders all ManageNetworkIcons components', () => {
    const labels = [
      'Connections',
      'Following & Followers',
      'Groups',
      'Events',
      'Pages',
      'Newsletters',
    ];

    render(
      <BrowserRouter>
        <ManageNetworkCard />
      </BrowserRouter>
    );

    labels.forEach(label => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });
});
