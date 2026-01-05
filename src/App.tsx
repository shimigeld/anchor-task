import { Container } from '@mui/material';
import { QuizProvider } from './context/QuizContext';
import QuestionCard from './components/QuestionCard';
import ScoreScreen from './components/ScoreScreen';
import { useStatus } from './store/selectors/quizSelectors';

/** Renders the current view (quiz or score screen) depending on app status. */
const AppContent = () => {
  const status = useStatus();

  return (
    <div className="bg-gray-100 min-h-screen">
      <Container component="main" maxWidth="md" className="py-8">
        {status === 'quiz' ? <QuestionCard /> : <ScoreScreen />}
      </Container>
    </div>
  );
};

/** Wraps the app content inside the quiz provider. */
const App = () => {
  return (
    <QuizProvider>
      <AppContent />
    </QuizProvider>
  );
};

export default App;
