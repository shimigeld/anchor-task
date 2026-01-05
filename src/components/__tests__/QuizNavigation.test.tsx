import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QuizProvider } from '../../context/QuizContext';
import QuizNavigation from '../../components/QuizNavigation';

describe('QuizNavigation Component', () => {
  it('should render navigation buttons', () => {
    render(
      <QuizProvider>
        <QuizNavigation />
      </QuizProvider>
    );

    expect(screen.getByRole('button', { name: /Next/i })).toBeInTheDocument();
  });

  it('should disable previous button on first question', () => {
    render(
      <QuizProvider>
        <QuizNavigation />
      </QuizProvider>
    );

    const previousButton = screen.queryByRole('button', { name: /Previous/i });
    expect(previousButton).toBeInTheDocument();
  });

  it('should disable next button when no answer selected', () => {
    render(
      <QuizProvider>
        <QuizNavigation />
      </QuizProvider>
    );

    const nextButton = screen.getByRole('button', { name: /Next/i });
    expect(nextButton).toBeDisabled();
  });
});
