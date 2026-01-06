import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCurrentQuestion } from '../../store/selectors/quizSelectors';
import { QuizProvider } from '../../context/QuizContext';
import { ReactNode } from 'react';

const Wrapper = ({ children }: { children: ReactNode }) => <QuizProvider>{children}</QuizProvider>;

describe('useCurrentQuestion Selector', () => {
  it('should return the first question initially', () => {
    const { result } = renderHook(() => useCurrentQuestion(), { wrapper: Wrapper });

    expect(result.current).toBeDefined();
    expect(result.current.questionText).toContain('JSX');
  });

  it('should return question object with required properties', () => {
    const { result } = renderHook(() => useCurrentQuestion(), { wrapper: Wrapper });

    expect(result.current).toHaveProperty('id');
    expect(result.current).toHaveProperty('questionText');
    expect(result.current).toHaveProperty('options');
    expect(result.current).toHaveProperty('correctAnswerIndex');
  });

  it('should return options array', () => {
    const { result } = renderHook(() => useCurrentQuestion(), { wrapper: Wrapper });

    expect(Array.isArray(result.current.options)).toBe(true);
    expect(result.current.options.length).toBeGreaterThan(0);
  });
});
