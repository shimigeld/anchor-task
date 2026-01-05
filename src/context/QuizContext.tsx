import { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';
import { quizReducer } from '../store/reducer/quizReducer';
import { initialState, QuizState } from '../store/state/quizState';
import { QuizAction } from '../store/actions/quizActions';

interface QuizContextType {
  state: QuizState;
  dispatch: Dispatch<QuizAction>;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

/** Supplies quiz state and dispatch to the component tree. */
export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

/** Convenience hook for accessing quiz state and dispatcher. */
export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
