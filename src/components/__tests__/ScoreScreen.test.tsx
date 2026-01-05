import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QuizProvider } from '../../context/QuizContext';
import ScoreScreen from '../../components/ScoreScreen';

describe('ScoreScreen Component', () => {
  it('should render score screen', () => {
    render(
      <QuizProvider>
        <ScoreScreen />
      </QuizProvider>
    );

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

  it('should have a restart button', () => {
    render(
      <QuizProvider>
        <ScoreScreen />
      </QuizProvider>
    );

    const restartButton = screen.getByRole('button', { name: /Try Again/i });
    expect(restartButton).toBeInTheDocument();
  });

  it('should handle restart button click', () => {
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
});
