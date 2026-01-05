import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCurrentQuestionIndex, useAnswers, useScore, useStatus } from '../../store/selectors/quizSelectors';
import { QuizProvider } from '../../context/QuizContext';
import { ReactNode } from 'react';

const Wrapper = ({ children }: { children: ReactNode }) => <QuizProvider>{children}</QuizProvider>;

describe('Quiz Selectors', () => {
  it('should return current question index', () => {
    const { result } = renderHook(() => useCurrentQuestionIndex(), { wrapper: Wrapper });
    expect(result.current).toBe(0);
  });

  it('should return answers array', () => {
    const { result } = renderHook(() => useAnswers(), { wrapper: Wrapper });
    expect(Array.isArray(result.current)).toBe(true);
    expect(result.current.length).toBeGreaterThan(0);
  });

  it('should return initial status as quiz', () => {
    const { result } = renderHook(() => useStatus(), { wrapper: Wrapper });
    expect(result.current).toBe('quiz');
  });

  it('should return score calculation', () => {
    const { result } = renderHook(() => useScore(), { wrapper: Wrapper });
    expect(typeof result.current).toBe('number');
    expect(result.current).toBe(0);
  });
});
