import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QuizProvider } from '../../context/QuizContext';
import Navbar from '../../components/Navbar';

describe('Navbar Component', () => {
  it('should render navigation tabs', () => {
    render(
      <QuizProvider>
        <Navbar />
      </QuizProvider>
    );

    expect(screen.getByText(/Question 1/i)).toBeInTheDocument();
  });

  it('should render all question tabs', () => {
    render(
      <QuizProvider>
        <Navbar />
      </QuizProvider>
    );

    const tabs = screen.getAllByRole('tab');
    expect(tabs.length).toBeGreaterThan(0);
  });

  it('should disable tabs for unanswered questions', () => {
    render(
      <QuizProvider>
        <Navbar />
      </QuizProvider>
    );

    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).not.toBeDisabled();
  });
});
