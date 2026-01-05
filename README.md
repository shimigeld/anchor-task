# Anchor Task - Interactive Quiz Application

A modern, responsive React 19 quiz application built with TypeScript, Material-UI, and Tailwind CSS. The app features state management using Context API and a reducer pattern, with a clean separation of concerns using a store-based architecture.

## Features

- **Interactive Quiz Interface**: Display questions with multiple-choice answers
- **Progress Tracking**: Navigate through questions with Next/Previous buttons
- **Answer Validation**: Only allow submission when all questions are answered
- **Score Calculation**: Automatic score computation and percentage display
- **Navigation Control**: Tab-based navigation with intelligent gating (restrict access to unanswered questions)
- **Responsive Design**: Mobile-friendly UI using Tailwind CSS and Material-UI
- **React 19 Compatible**: Built with modern React hooks and concurrent features

## Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI)
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **State Management**: Context API + useReducer
- **Package Manager**: npm

## Project Structure

```
src/
├── components/           # React components
│   ├── Navbar.tsx       # Question tabs and navigation
│   ├── QuestionCard.tsx # Main quiz interface
│   ├── QuizNavigation.tsx # Next/Previous/Submit controls
│   └── ScoreScreen.tsx  # Final score display
├── context/             # Context setup
│   └── QuizContext.tsx  # Quiz provider and useQuiz hook
├── store/              # State management
│   ├── actions/        # Action type definitions
│   ├── reducer/        # Reducer logic
│   ├── selectors/      # Custom hooks for state selection
│   └── state/          # State types and initial state
├── data/               # Application data
│   └── quizData.ts     # Quiz questions and answers
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Key Concepts

### State Management
The app uses a centralized state management pattern with:
- **QuizContext**: Provides state and dispatch to the component tree
- **Reducer**: Manages state transitions for quiz actions
- **Selectors**: Custom hooks for efficient state selection and memoization

### Actions
- `SELECT_ANSWER`: Store user's answer for a question
- `NEXT_QUESTION`: Navigate to next question
- `PREVIOUS_QUESTION`: Navigate to previous question
- `JUMP_TO_QUESTION`: Jump to a specific question
- `SUBMIT_QUIZ`: Finalize quiz and show scores
- `RESTART_QUIZ`: Reset quiz to initial state

### Quiz State
```typescript
interface QuizState {
  currentQuestionIndex: number;  // Current active question
  answers: (number | null)[];    // Array of selected answers
  status: 'quiz' | 'score';      // Current view mode
}
```

## Performance Optimization

- **Memoized Selectors**: Score calculation and navigation state are memoized to prevent unnecessary re-renders
- **useCallback Hooks**: Event handlers are wrapped with useCallback to maintain referential equality
- **Efficient Dependencies**: Dependencies in hooks are carefully managed for optimal performance

## Browser Support

Works in all modern browsers that support:
- ES2020
- React 19
- CSS Grid/Flexbox

## License

MIT

