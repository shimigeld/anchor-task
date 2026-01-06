import {
  Card,
  CardContent,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { useQuiz } from '../context/QuizContext';
import { quizQuestions } from '../mock/quizMockData';
import Navbar from './Navbar';
import { 
  SELECT_ANSWER
} from '../store/actions/quizActions';
import QuizNavigation from './QuizNavigation';
import { useAnswers, useCurrentQuestion, useCurrentQuestionIndex } from '../store/selectors/quizSelectors';
/** Displays the current question, options, and navigation controls. */
const QuestionCard = () => {
  const { dispatch } = useQuiz();
  const currentQuestionIndex = useCurrentQuestionIndex();
  const answers = useAnswers();
  const currentQuestion = useCurrentQuestion()

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: SELECT_ANSWER,
      payload: {
        questionIndex: currentQuestionIndex,
        answerIndex: parseInt(event.target.value, 10),
      },
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <Navbar />
      <CardContent className="p-6">
        <Typography variant="h5" component="div" className="mb-4">
          {`Question ${currentQuestionIndex + 1}/${quizQuestions.length}`}
        </Typography>
        <Typography variant="body1" className="min-h-[5em]">
            {currentQuestion.questionText}
        </Typography>
        <FormControl component="fieldset" className="my-6 w-full">
          <FormLabel component="legend">Choose an answer:</FormLabel>
          <RadioGroup
            aria-label="quiz-options"
            name="quiz-options-group"
            value={answers[currentQuestionIndex] !== null ? answers[currentQuestionIndex].toString() : ''}
            onChange={handleAnswerChange}
          >
            {currentQuestion.options.map((option: string, index: number) => (
              <FormControlLabel
                key={index}
                value={index.toString()}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <QuizNavigation />
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
