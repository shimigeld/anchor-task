import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../../App';

describe('App Component', () => {
  it('should render question card initially', () => {
    render(<App />);
    expect(screen.getByText(/JSX/i)).toBeInTheDocument();
  });

  it('should display question card', () => {
    render(<App />);
    expect(screen.getByText(/Question 1\/5/i)).toBeInTheDocument();
  });

  it('should render container with proper styling', () => {
    const { container } = render(<App />);
    expect(container.querySelector('.bg-gray-100')).toBeInTheDocument();
  });
});
