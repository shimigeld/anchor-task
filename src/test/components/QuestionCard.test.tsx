import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QuizProvider } from '../../context/QuizContext';
import QuestionCard from '../../components/QuestionCard';

describe('QuestionCard Component', () => {
  it('should render the question card', () => {
    render(
      <QuizProvider>
        <QuestionCard />
      </QuizProvider>
    );

    expect(screen.getByText(/Question 1\//i)).toBeInTheDocument();
  });

  it('should display question text', () => {
    render(
      <QuizProvider>
        <QuestionCard />
      </QuizProvider>
    );

    expect(screen.getByText(/JSX/i)).toBeInTheDocument();
  });

  it('should have radio buttons for options', () => {
    render(
      <QuizProvider>
        <QuestionCard />
      </QuizProvider>
    );

    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons.length).toBeGreaterThan(0);
  });

  it('should allow selecting an answer', () => {
    render(
      <QuizProvider>
        <QuestionCard />
      </QuizProvider>
    );

    const radioButtons = screen.getAllByRole('radio');
    fireEvent.click(radioButtons[0]);

    expect(radioButtons[0]).toBeChecked();
  });
});
