import { describe, it, expect } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useQuiz } from '../../context/QuizContext';
import { QuizProvider } from '../../context/QuizContext';
import { SELECT_ANSWER, NEXT_QUESTION } from '../../store/actions/quizActions';
import { ReactNode } from 'react';

const Wrapper = ({ children }: { children: ReactNode }) => <QuizProvider>{children}</QuizProvider>;

describe('QuizContext', () => {
  it('should provide initial state', () => {
    const { result } = renderHook(() => useQuiz(), { wrapper: Wrapper });

    expect(result.current.state.currentQuestionIndex).toBe(0);
    expect(result.current.state.status).toBe('quiz');
    expect(result.current.state.answers).toHaveLength(5);
  });

  it('should dispatch actions and update state', () => {
    const { result } = renderHook(() => useQuiz(), { wrapper: Wrapper });

    act(() => {
      result.current.dispatch({
        type: SELECT_ANSWER,
        payload: { questionIndex: 0, answerIndex: 1 },
      });
    });

    expect(result.current.state.answers[0]).toBe(1);
  });

  it('should handle navigation actions', () => {
    const { result } = renderHook(() => useQuiz(), { wrapper: Wrapper });

    act(() => {
      result.current.dispatch({
        type: SELECT_ANSWER,
        payload: { questionIndex: 0, answerIndex: 0 },
      });
    });

    act(() => {
      result.current.dispatch({ type: NEXT_QUESTION });
    });

    expect(result.current.state.currentQuestionIndex).toBe(1);
  });

  it('should throw error if useQuiz is used outside provider', () => {
    // Suppress error logs for this test
    const consoleError = console.error;
    console.error = () => {};

    expect(() => {
      renderHook(() => useQuiz());
    }).toThrow('useQuiz must be used within a QuizProvider');

    console.error = consoleError;
  });
});
