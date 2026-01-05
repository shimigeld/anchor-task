import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QuizProvider } from '../../context/QuizContext';
import QuestionCard from '../../components/QuestionCard';

describe('Quiz Flow Integration Tests', () => {
  it('should complete full quiz flow from question 1 to score screen', async () => {
    render(
      <QuizProvider>
        <QuestionCard />
      </QuizProvider>
    );

    // Start on question 1
    expect(screen.getByText(/Question 1\/5/i)).toBeInTheDocument();

    // Answer question 1
    const radioButtons = screen.getAllByRole('radio');
    fireEvent.click(radioButtons[0]);

    // Navigate to next question
    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText(/Question 2\/5/i)).toBeInTheDocument();
    });
  });

  it('should track answers across multiple questions', async () => {
    render(
      <QuizProvider>
        <QuestionCard />
      </QuizProvider>
    );

    // Answer question 1 with option 0
    const radios1 = screen.getAllByRole('radio');
    fireEvent.click(radios1[0]);

    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText(/Question 2\/5/i)).toBeInTheDocument();
    });

    // Answer question 2 with option 1
    const radios2 = screen.getAllByRole('radio');
    fireEvent.click(radios2[1]);

    // Go back to question 1
    const prevButton = screen.queryByRole('button', { name: /Previous/i });
    if (prevButton) {
      fireEvent.click(prevButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Question 1\/5/i)).toBeInTheDocument();
      });

      // Verify answer is still selected
      const questionOneRadios = screen.getAllByRole('radio');
      expect(questionOneRadios[0]).toBeChecked();
    }
  });

  it('should prevent navigation without selecting an answer', () => {
    render(
      <QuizProvider>
        <QuestionCard />
      </QuizProvider>
    );

    const nextButton = screen.getByRole('button', { name: /Next/i });
    expect(nextButton).toBeDisabled();
  });

  it('should allow changing answer selection', async () => {
    render(
      <QuizProvider>
        <QuestionCard />
      </QuizProvider>
    );

    const radioButtons = screen.getAllByRole('radio');

    // Select first option
    fireEvent.click(radioButtons[0]);
    expect(radioButtons[0]).toBeChecked();

    // Change to second option
    fireEvent.click(radioButtons[1]);
    expect(radioButtons[1]).toBeChecked();
    expect(radioButtons[0]).not.toBeChecked();

    // Change back to first option
    fireEvent.click(radioButtons[0]);
    expect(radioButtons[0]).toBeChecked();
    expect(radioButtons[1]).not.toBeChecked();
  });

  it('should display question metadata correctly', () => {
    render(
      <QuizProvider>
        <QuestionCard />
      </QuizProvider>
    );

    // Check question counter
    expect(screen.getByText(/Question 1\/5/i)).toBeInTheDocument();

    // Check that question text is visible
    expect(screen.getByText(/JSX/i)).toBeInTheDocument();

    // Check that all 4 options are rendered
    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(4);
  });

  it('should handle rapid answer changes', () => {
    render(
      <QuizProvider>
        <QuestionCard />
      </QuizProvider>
    );

    const radioButtons = screen.getAllByRole('radio');

    // Rapidly change answers
    fireEvent.click(radioButtons[0]);
    fireEvent.click(radioButtons[1]);
    fireEvent.click(radioButtons[2]);
    fireEvent.click(radioButtons[3]);
    fireEvent.click(radioButtons[0]);

    expect(radioButtons[0]).toBeChecked();
  });
});
