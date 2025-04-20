import { describe, test, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import JobApplicationModal from '../../components/Jobs&hiring/JobApplicationModal';
import '@testing-library/jest-dom';

describe('JobApplicationModal', () => {
  const mockProps = {
    isOpen: true,
    onClose: vi.fn(),
    companyName: 'Test Company',
    onSubmit: vi.fn(),
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders modal when isOpen is true', () => {
    render(<JobApplicationModal {...mockProps} />);
    expect(screen.getByText(/Apply to Test Company/)).toBeInTheDocument();
  });

  test('does not render modal when isOpen is false', () => {
    render(<JobApplicationModal {...mockProps} isOpen={false} />);
    expect(screen.queryByText(/Apply to Test Company/)).not.toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    render(<JobApplicationModal {...mockProps} />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  describe('New Application Form', () => {
    test('renders form fields for new application', () => {
      render(<JobApplicationModal {...mockProps} />);
      expect(screen.getByText('Resume *')).toBeInTheDocument();
      expect(screen.getByText('Cover Letter')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Your email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Your phone number')).toBeInTheDocument();
    });

    test('shows error when submitting without required fields', () => {
      render(<JobApplicationModal {...mockProps} />);
      const form = screen.getByTestId('application-form');
      fireEvent.submit(form);
      
      // Check for one error at a time
      expect(screen.getByText('Please upload your resume')).toBeInTheDocument();
      
      // Add resume and submit again to check email error
      const file = new File(['test'], 'resume.pdf', { type: 'application/pdf' });
      fireEvent.change(screen.getByTestId('resume-upload'), {
        target: { files: [file] }
      });
      fireEvent.submit(form);
      expect(screen.getByText('Please enter your email')).toBeInTheDocument();
    });

    test('handles file upload', () => {
      render(<JobApplicationModal {...mockProps} />);
      const file = new File(['test'], 'resume.pdf', { type: 'application/pdf' });
      const input = screen.getByTestId('resume-upload') as HTMLInputElement;
      
      fireEvent.change(input, {
        target: { files: [file] }
      });
      
      expect(input.files?.[0].name).toBe('resume.pdf');
    });

    test('submits form with valid data', () => {
      render(<JobApplicationModal {...mockProps} />);
      
      const file = new File(['test'], 'resume.pdf', { type: 'application/pdf' });
      fireEvent.change(screen.getByTestId('resume-upload'), {
        target: { files: [file] }
      });
      
      fireEvent.change(screen.getByPlaceholderText('Your email'), {
        target: { value: 'test@example.com' }
      });
      
      fireEvent.change(screen.getByLabelText('Cover Letter', { selector: 'textarea' }), {
        target: { value: 'Test cover letter' }
      });
      
      fireEvent.change(screen.getByPlaceholderText('Your phone number'), {
        target: { value: '1234567890' }
      });
      
      fireEvent.submit(screen.getByTestId('application-form'));
      expect(mockProps.onSubmit).toHaveBeenCalledWith('Pending');
    });
  });

  describe('Existing Application View', () => {
    const existingProps = {
      ...mockProps,
      existingStatus: 'Viewed' as const,
    };

    test('renders existing application details', () => {
      render(<JobApplicationModal {...existingProps} />);
      expect(screen.getByText('Application Details')).toBeInTheDocument();
      expect(screen.getByText('Viewed')).toBeInTheDocument();
      expect(screen.getByText('Your_Resume.pdf')).toBeInTheDocument();
      expect(screen.getByText(/john.doe@example.com/i)).toBeInTheDocument();
      expect(screen.getByText(/\(555\) 123-4567/i)).toBeInTheDocument();
    });

    test('shows correct status styling', () => {
      const statuses = [
        { status: 'Pending', bg: 'bg-yellow-100', text: 'text-yellow-800' },
        { status: 'Viewed', bg: 'bg-blue-100', text: 'text-blue-800' },
        { status: 'Rejected', bg: 'bg-red-100', text: 'text-red-800' },
        { status: 'Accepted', bg: 'bg-green-100', text: 'text-green-800' },
      ];

      statuses.forEach(({ status, bg, text }) => {
        render(
          <JobApplicationModal
            {...mockProps}
            existingStatus={status as any}
          />
        );
        const statusElement = screen.getByText(status);
        expect(statusElement).toHaveClass(bg);
        expect(statusElement).toHaveClass(text);
      });
    });

    test('allows reapplying', () => {
      render(<JobApplicationModal {...existingProps} />);
      fireEvent.click(screen.getByText('Reapply'));
      expect(mockProps.onSubmit).toHaveBeenCalledWith('Pending');
    });

    test('disables reapply button when status is Pending', () => {
      render(
        <JobApplicationModal
          {...mockProps}
          existingStatus="Pending"
        />
      );
      expect(screen.getByText('Reapply')).toBeDisabled();
    });
  });
});