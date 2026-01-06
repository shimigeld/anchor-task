import { Box, Tab, Tabs } from '@mui/material';
import { useQuiz } from '../context/QuizContext';
import { JUMP_TO_QUESTION } from '../store/actions/quizActions';
import {
  useAnswers,
  useCurrentQuestionIndex,
} from '../store/selectors/quizSelectors';
import { quizQuestions } from '../mock/quizMockData';

const TOTAL_QUESTIONS = quizQuestions.length;

/** Shows question tabs and controls navigation by restricting access to unanswered questions. */
const Navbar = () => {
  const { dispatch } = useQuiz();
  const currentQuestionIndex = useCurrentQuestionIndex();
  const answers = useAnswers();

  const highestAllowedIndex = (() => {
    const nextUnanswered = answers.indexOf(null);
    return nextUnanswered === -1 ? TOTAL_QUESTIONS - 1 : nextUnanswered;
  })();

  const handleTabClick = (_event: React.SyntheticEvent, newValue: number) => {
    if (newValue <= highestAllowedIndex) {
      dispatch({
        type: JUMP_TO_QUESTION,
        payload: { questionIndex: newValue },
      });
    }
  };

  return (
    <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider', mb: 2 }}>
      <Tabs
        value={currentQuestionIndex}
        onChange={handleTabClick}
        aria-label="quiz navigation"
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        {quizQuestions.map((question, index) => {
          const isDisabled = index > highestAllowedIndex;
          return (
            <Tab
              key={question.id}
              label={`Question ${index + 1}`}
              id={`quiz-tab-${index}`}
              aria-controls={`quiz-tabpanel-${index}`}
              disabled={isDisabled}
            />
          );
        })}
      </Tabs>
    </Box>
  );
};

export default Navbar;
