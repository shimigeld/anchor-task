import { quizQuestions } from "../../mock/quizMockData";

export interface QuizState {
  currentQuestionIndex: number;
  answers: (number | null)[];
  status: 'quiz' | 'score';
}

export const initialState: QuizState = {
  currentQuestionIndex: 0,
  answers: Array(quizQuestions.length).fill(null),
  status: 'quiz',
};
