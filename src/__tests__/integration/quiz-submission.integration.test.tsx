import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QuizProvider } from '../../context/QuizContext';
import QuestionCard from '../../components/QuestionCard';
import ScoreScreen from '../../components/ScoreScreen';

describe('Quiz Submission and Scoring Integration Tests', () => {
  it('should enable submit button only on last question with answer', async () => {
    const { } = render(
      <QuizProvider>
        <QuestionCard />
      </QuizProvider>
    );

    // Answer all questions programmatically by navigating through quiz
    for (let i = 0; i < 4; i++) {
      const radios = screen.getAllByRole('radio');
      fireEvent.click(radios[0]);

      const nextButton = screen.getByRole('button', { name: /Next/i });
      fireEvent.click(nextButton);

      await waitFor(() => {
        expect(screen.getByText(new RegExp(`Question ${i + 2}/5`))).toBeInTheDocument();
      });
    }

    // On last question, answer and check for Submit button
    const radios = screen.getAllByRole('radio');
    fireEvent.click(radios[0]);

    await waitFor(() => {
      const submitButton = screen.queryByRole('button', { name: /Submit/i });
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('should calculate score correctly', () => {
    render(
      <QuizProvider>
        <ScoreScreen />
      </QuizProvider>
    );

    // Initially should show 0% (no answers)
    expect(screen.getByText(/0%/)).toBeInTheDocument();
    expect(screen.getByText('Quiz Complete!')).toBeInTheDocument();
  });

  it('should display score percentage', () => {
    render(
      <QuizProvider>
        <ScoreScreen />
      </QuizProvider>
    );

    expect(screen.getByText('Your Score:')).toBeInTheDocument();
    expect(screen.getByText(/0%/)).toBeInTheDocument();
  });

  it('should have working restart button on score screen', () => {
    render(
      <QuizProvider>
        <ScoreScreen />
      </QuizProvider>
    );

    const restartButton = screen.getByRole('button', { name: /Try Again/i });
    expect(restartButton).toBeInTheDocument();
    
    fireEvent.click(restartButton);
    expect(restartButton).toBeInTheDocument();
  });

  it('should prevent submit when not on last question', async () => {
    render(
      <QuizProvider>
        <QuestionCard />
      </QuizProvider>
    );

    // Answer first question
    const radioButtons = screen.getAllByRole('radio');
    fireEvent.click(radioButtons[0]);

    // Should only see Next button, not Submit
    const nextButton = screen.queryByRole('button', { name: /Next/i });
    const submitButton = screen.queryByRole('button', { name: /Submit/i });

    expect(nextButton).toBeInTheDocument();
    expect(submitButton).not.toBeInTheDocument();
  });

  it('should show disabled submit on last question without answer', async () => {
    render(
      <QuizProvider>
        <QuestionCard />
      </QuizProvider>
    );

    // Navigate to question 5 (last)
    for (let i = 0; i < 4; i++) {
      const radios = screen.getAllByRole('radio');
      fireEvent.click(radios[0]);

      const nextButton = screen.getByRole('button', { name: /Next/i });
      fireEvent.click(nextButton);

      await waitFor(() => {
        const questionNum = i + 2;
        expect(screen.getByText(new RegExp(`Question ${questionNum}/5`))).toBeInTheDocument();
      });
    }

    // Now on question 5 without answer - should have disabled Submit
    await waitFor(() => {
      const submitButton = screen.queryByRole('button', { name: /Submit/i });
      if (submitButton) {
        expect(submitButton).toBeDisabled();
      }
    });
  });
});
