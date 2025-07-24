import { render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Logo from '../../components/NavigationBar/Logo';

describe('Logo Component', () => {
  it('renders the Logo component with the correct props', () => {
    render(<Logo id="test-logo" />);
    const logoElement = screen.getByAltText('Logo');
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute('id', 'test-logo');
    expect(logoElement).toHaveAttribute('src', './src/assets/LogoDark1.png'); 
  });
});
