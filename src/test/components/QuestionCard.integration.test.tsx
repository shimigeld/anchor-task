import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QuizProvider } from '../../context/QuizContext';
import QuestionCard from '../../components/QuestionCard';

describe('QuestionCard Integration Tests', () => {
  it('should display current question counter', () => {
    render(
      <QuizProvider>
        <QuestionCard />
      </QuizProvider>
    );

    expect(screen.getByText(/Question 1\/5/i)).toBeInTheDocument();
  });

  it('should allow multiple selection before submission', () => {
    render(
      <QuizProvider>
        <QuestionCard />
      </QuizProvider>
    );

    const radioButtons = screen.getAllByRole('radio');
    
    fireEvent.click(radioButtons[0]);
    expect(radioButtons[0]).toBeChecked();

    fireEvent.click(radioButtons[1]);
    expect(radioButtons[1]).toBeChecked();
    expect(radioButtons[0]).not.toBeChecked();
  });

  it('should display form label for choosing answer', () => {
    render(
      <QuizProvider>
        <QuestionCard />
      </QuizProvider>
    );

    expect(screen.getByText('Choose an answer:')).toBeInTheDocument();
  });

  it('should render correct number of options', () => {
    render(
      <QuizProvider>
        <QuestionCard />
      </QuizProvider>
    );

    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons.length).toBe(4);
  });
});
