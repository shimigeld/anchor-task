import { describe, it, expect, beforeEach } from 'vitest';
import { quizReducer } from '../../store/reducer/quizReducer';
import { initialState } from '../../store/state/quizState';
import {
  SELECT_ANSWER,
  NEXT_QUESTION,
  PREVIOUS_QUESTION,
  JUMP_TO_QUESTION,
  SUBMIT_QUIZ,
  RESTART_QUIZ,
} from '../../store/actions/quizActions';

describe('quizReducer', () => {
  let state = initialState;

  beforeEach(() => {
    state = initialState;
  });

  it('should return initial state', () => {
    expect(state.currentQuestionIndex).toBe(0);
    expect(state.status).toBe('quiz');
    expect(state.answers[0]).toBeNull();
  });

  it('should handle SELECT_ANSWER action', () => {
    const newState = quizReducer(state, {
      type: SELECT_ANSWER,
      payload: { questionIndex: 0, answerIndex: 2 },
    });

    expect(newState.answers[0]).toBe(2);
    expect(newState.currentQuestionIndex).toBe(0);
  });

  it('should handle NEXT_QUESTION action', () => {
    const newState = quizReducer(state, {
      type: NEXT_QUESTION,
    });

    expect(newState.currentQuestionIndex).toBe(1);
  });

  it('should handle PREVIOUS_QUESTION action', () => {
    const stateAtQuestion2 = { ...state, currentQuestionIndex: 2 };
    const newState = quizReducer(stateAtQuestion2, {
      type: PREVIOUS_QUESTION,
    });

    expect(newState.currentQuestionIndex).toBe(1);
  });

  it('should not go beyond first question on PREVIOUS_QUESTION', () => {
    const newState = quizReducer(state, {
      type: PREVIOUS_QUESTION,
    });

    expect(newState.currentQuestionIndex).toBe(0);
  });

  it('should handle JUMP_TO_QUESTION action for answered questions', () => {
    const stateAtQuestion2 = { ...state, currentQuestionIndex: 2, answers: [0, null, null, null, null] };
    const newState = quizReducer(stateAtQuestion2, {
      type: JUMP_TO_QUESTION,
      payload: { questionIndex: 1 },
    });

    expect(newState.currentQuestionIndex).toBe(1);
  });

  it('should not allow jumping to unanswered questions', () => {
    const newState = quizReducer(state, {
      type: JUMP_TO_QUESTION,
      payload: { questionIndex: 3 },
    });

    expect(newState.currentQuestionIndex).toBe(0);
  });

  it('should handle SUBMIT_QUIZ action', () => {
    const newState = quizReducer(state, { type: SUBMIT_QUIZ });

    expect(newState.status).toBe('score');
  });

  it('should handle RESTART_QUIZ action', () => {
    const stateBeforeRestart = {
      currentQuestionIndex: 3,
      answers: [0, 1, 2, 1, 0],
      status: 'score' as const,
    };

    const newState = quizReducer(stateBeforeRestart, { type: RESTART_QUIZ });

    expect(newState).toEqual(initialState);
  });
});
