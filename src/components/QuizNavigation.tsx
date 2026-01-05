import { Box, Button } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { useQuiz } from '../context/QuizContext';
import { quizQuestions } from '../data/quizData';
import { NEXT_QUESTION, PREVIOUS_QUESTION, SUBMIT_QUIZ } from '../store/actions/quizActions';
import { useAnswers, useCurrentQuestionIndex } from '../store/selectors/quizSelectors';

/** Renders Next/Previous/Submit buttons that dispatch the appropriate quiz actions. */
const QuizNavigation = () => {
    const { dispatch } = useQuiz();
    const currentQuestionIndex = useCurrentQuestionIndex();
    const answers = useAnswers();

    const handleNext = useCallback(() => {
        dispatch({ type: NEXT_QUESTION });
    }, [dispatch]);

    const handlePrevious = useCallback(() => {
        dispatch({ type: PREVIOUS_QUESTION });
    }, [dispatch]);

    const handleSubmit = useCallback(() => {
        dispatch({ type: SUBMIT_QUIZ });
    }, [dispatch]);

    const totalQuestions = quizQuestions.length;
    const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
    const isFirstQuestion = currentQuestionIndex === 0;
    const isAnswerSelected = useMemo(() => answers[currentQuestionIndex] !== null, [answers, currentQuestionIndex]);

    return (
        <Box className="flex justify-between mt-4">
            <Button
                variant="outlined"
                onClick={handlePrevious}
                disabled={isFirstQuestion}
                className={isFirstQuestion ? 'invisible' : ''}
            >
                Previous
            </Button>

            {isLastQuestion ? (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={!isAnswerSelected}
                >
                    Submit
                </Button>
            ) : (
                <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={!isAnswerSelected}
                >
                    Next
                </Button>
            )}
        </Box>
    );
};

export default QuizNavigation;
