import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { useQuiz } from '../context/QuizContext';
import { quizQuestions } from '../mock/quizMockData';
import { RESTART_QUIZ } from '../store/actions/quizActions';
import { useScore } from '../store/selectors/quizSelectors';
import { useCallback, useMemo } from 'react';

const TOTAL_QUESTIONS = quizQuestions.length;

/** Displays the final score summary and allows restarting the quiz. */
const ScoreScreen = () => {
    const { dispatch } = useQuiz();

    const score = useScore();
    const scorePercentage = useMemo(() => {
        if (!TOTAL_QUESTIONS) {
            return 0;
        }
        return Math.round((score / TOTAL_QUESTIONS) * 100);
    }, [score]);

    const handleRestart = useCallback(() => {
        dispatch({ type: RESTART_QUIZ });
    }, [dispatch]);

    return (
        <Card className="w-full max-w-md mx-auto mt-10">
            <CardContent className="p-6 text-center">
                <Typography variant="h4" component="div" className="mb-4">
                    Quiz Complete!
                </Typography>
                <Typography variant="h5" className="mb-6">
                    Your Score:
                </Typography>
                <Typography variant="h2" component="p" className="font-bold mb-8">
                    {scorePercentage}%
                </Typography>
                <Box>
                    <Button variant="contained" color="primary" onClick={handleRestart}>
                        Try Again
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ScoreScreen;
