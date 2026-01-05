import { QuizState, initialState } from "../state/quizState";
import { 
    QuizAction,
    SELECT_ANSWER,
    NEXT_QUESTION,
    PREVIOUS_QUESTION,
    SUBMIT_QUIZ,
    JUMP_TO_QUESTION,
    RESTART_QUIZ
} from "../actions/quizActions";
import { quizQuestions } from "../../data/quizData";

/**
 * Manages quiz state transitions in response to dispatched actions.
 *
 * @param state - The current quiz state.
 * @param action - The dispatched quiz action.
 * @returns The updated quiz state.
 */
export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    // Persists the user's selected answer for a specific question.
    case SELECT_ANSWER: {
      const newAnswers = [...state.answers];
      newAnswers[action.payload.questionIndex] = action.payload.answerIndex;
      return {
        ...state,
        answers: newAnswers,
      };
    }
    // Navigates to the next question, if not on the last question.
    case NEXT_QUESTION: {
      if (state.currentQuestionIndex < quizQuestions.length - 1) {
        return {
          ...state,
          currentQuestionIndex: state.currentQuestionIndex + 1,
        };
      }
      return state;
    }
    // Navigates to the previous question, if not on the first question.
    case PREVIOUS_QUESTION: {
      if (state.currentQuestionIndex > 0) {
        return {
          ...state,
          currentQuestionIndex: state.currentQuestionIndex - 1,
        };
      }
      return state;
    }
    // Allows jumping to a specific question. Used by the Navbar pagination.
    // Navigation is only allowed if the target question has been answered or is the current question.
    case JUMP_TO_QUESTION: {
        const { questionIndex } = action.payload;
        if (state.answers[questionIndex] !== null || state.currentQuestionIndex > questionIndex) {
             return {
                ...state,
                currentQuestionIndex: questionIndex
             };
        }
        return state;
    }
    // Changes the app status to 'score' to display the final score screen.
    case SUBMIT_QUIZ: {
      return {
        ...state,
        status: 'score',
      };
    }
    // Resets the entire quiz state to its initial values for a retry.
    case RESTART_QUIZ: {
        return initialState;
    }
    default:
      return state;
  }
}
