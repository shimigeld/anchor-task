export const SELECT_ANSWER = 'SELECT_ANSWER';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const PREVIOUS_QUESTION = 'PREVIOUS_QUESTION';
export const SUBMIT_QUIZ = 'SUBMIT_QUIZ';
export const JUMP_TO_QUESTION = 'JUMP_TO_QUESTION';
export const RESTART_QUIZ = 'RESTART_QUIZ';


export type QuizAction =
  | { type: typeof SELECT_ANSWER; payload: { questionIndex: number; answerIndex: number } }
  | { type: typeof NEXT_QUESTION }
  | { type: typeof PREVIOUS_QUESTION }
  | { type: typeof SUBMIT_QUIZ }
  | { type: typeof JUMP_TO_QUESTION; payload: { questionIndex: number } }
  | { type: typeof RESTART_QUIZ };
