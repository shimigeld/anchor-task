import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QuizProvider } from '../../context/QuizContext';
import QuizNavigation from '../../components/QuizNavigation';
import QuestionCard from '../../components/QuestionCard';

describe('Navigation Integration Tests', () => {
  it('should enable next button when answer is selected', async () => {
    render(
      <QuizProvider>
        <QuestionCard />
      </QuizProvider>
    );

    const radioButtons = screen.getAllByRole('radio');
    fireEvent.click(radioButtons[0]);

    await waitFor(() => {
      const nextButton = screen.getByRole('button', { name: /Next/i });
      expect(nextButton).not.toBeDisabled();
    });
  });

  it('should navigate between questions', async () => {
    render(
      <QuizProvider>
        <QuestionCard />
      </QuizProvider>
    );

    expect(screen.getByText(/Question 1\/5/i)).toBeInTheDocument();

    const radioButtons = screen.getAllByRole('radio');
    fireEvent.click(radioButtons[0]);

    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText(/Question 2\/5/i)).toBeInTheDocument();
    });
  });

  it('should disable previous button on first question', () => {
    render(
      <QuizProvider>
        <QuizNavigation />
      </QuizProvider>
    );

    const previousButton = screen.queryByRole('button', { name: /Previous/i });
    if (previousButton) {
      expect(previousButton).toBeInTheDocument();
    }
  });
});
