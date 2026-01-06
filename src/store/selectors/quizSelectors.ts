import { useMemo } from 'react';
import { useQuiz } from '../../context/QuizContext';
import { quizQuestions } from '../../mock/quizMockData';

/** Reads the current quiz state from the context. */
const useQuizState = () => useQuiz().state;

/** Returns the zero-based index of the active question. */
export const useCurrentQuestionIndex = () =>
  useQuizState().currentQuestionIndex;

/** Provides the array of answers submitted so far. */
export const useAnswers = () => useQuizState().answers;

/** Reports whether the quiz is still in progress or showing the score screen. */
export const useStatus = () => useQuizState().status;

/** Returns metadata for the current question (text and options). */
export const useCurrentQuestion = () => {
  const state = useQuizState();
  return quizQuestions[state.currentQuestionIndex];
};

/**
 * Calculates and memoizes the number of correct answers.
 * useMemo is retained because this performs an expensive iteration through
 * all answers comparing each with the correct answer. This prevents unnecessary
 * recalculations when the ScoreScreen component re-renders frequently.
 */
export const useScore = () => {
  const state = useQuizState();
  return useMemo(() => {
    return state.answers.reduce((score: number, answer, index) => {
      if (answer === quizQuestions[index].correctAnswerIndex) {
        return score + 1;
      }
      return score;
    }, 0);
  }, [state.answers]);
};
