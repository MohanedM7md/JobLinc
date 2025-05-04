import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SavedJobs from '../../components/Jobs&hiring/Saved_Jobs';
import '@testing-library/jest-dom';

describe('SavedJobs Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <SavedJobs />
      </MemoryRouter>
    );
  });

  test('renders the component with correct title', () => {
    expect(screen.getByText('My Jobs')).toBeInTheDocument();
    expect(screen.getByText('My items')).toBeInTheDocument();
  });

  test('displays only the Saved tab', () => {
    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.queryByText('In Progress')).not.toBeInTheDocument();
    expect(screen.queryByText('Applied')).not.toBeInTheDocument();
    expect(screen.queryByText('Archived')).not.toBeInTheDocument();
  });

  test('defaults to Saved tab with correct styling', () => {
    const savedTab = screen.getByText('Saved');
    expect(savedTab).toHaveClass('bg-softRosewood');
    expect(savedTab).toHaveClass('text-white');
  });

  test('displays correct number of jobs', () => {
    const jobElements = screen.getAllByRole('listitem');
    expect(jobElements.length).toBe(4);
  });

  test('displays job information correctly', () => {
    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('TechCorp Industries')).toBeInTheDocument();
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
    expect(screen.getByText('2 days ago')).toBeInTheDocument();
  });

  test('shows "Actively recruiting" when applicable', () => {
    const activeRecruitingTexts = screen.getAllByText('Actively recruiting');
    expect(activeRecruitingTexts.length).toBe(2);
  });

  test('shows "LinkedIn Easy Apply" when applicable', () => {
    const easyApplyTexts = screen.getAllByText('LinkedIn Easy Apply');
    expect(easyApplyTexts.length).toBe(4);
  });

  test('displays job logos', () => {
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(4);
  });
});