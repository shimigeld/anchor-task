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
├── components/                    # React UI Components
│   ├── Navbar.tsx                # Question tabs navigation
│   ├── QuestionCard.tsx          # Quiz question display
│   ├── QuizNavigation.tsx        # Quiz control buttons
│   ├── ScoreScreen.tsx           # Final score display
│   └── __tests__/                # Component unit tests
│       ├── App.test.tsx
│       ├── Navbar.test.tsx
│       ├── QuestionCard.test.tsx
│       ├── QuestionCard.integration.test.tsx
│       ├── QuizNavigation.test.tsx
│       └── ScoreScreen.test.tsx
│
├── context/                       # Context API setup
│   ├── QuizContext.tsx           # Quiz provider & useQuiz hook
│   └── __tests__/
│       └── QuizContext.test.tsx
│
├── store/                         # State Management (Centralized)
│   ├── actions/
│   │   └── quizActions.ts        # Action type definitions
│   ├── reducer/
│   │   └── quizReducer.ts        # State reducer logic
│   ├── selectors/
│   │   └── quizSelectors.ts      # Custom selector hooks
│   ├── state/
│   │   └── quizState.ts          # State types & initial state
│   └── __tests__/
│       ├── quizReducer.test.ts
│       ├── selectors.test.tsx
│       └── useCurrentQuestion.test.tsx
│
├── mock/                         # Mock data & fixtures
│   ├── quizMockData.ts          # Quiz questions mock dataset
│   └── __tests__/
│       └── quizMockData.test.ts
│
├── __tests__/                     # App-level & integration tests
│   ├── setup.ts                  # Test configuration
│   └── integration/
│       └── navigation.integration.test.tsx
│
├── App.tsx                        # Root application component
├── main.tsx                       # Application entry point
└── index.css                      # Global styles
```

### Directory Organization
- **Co-located tests**: Each feature has a `__tests__` subfolder for easy discovery
- **Store-based state**: All state management logic in `/store` folder
- **Separation of concerns**: Clear boundaries between components, context, and business logic

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

# Run tests
npm test

# Run tests in watch mode with UI
npm run test:ui

# Generate test coverage report
npm run test:coverage
```

## Testing

The project includes comprehensive unit and integration tests using **Vitest** and **Testing Library**.

### Test Coverage
- **36+ unit and integration tests** across all modules
- **Component tests**: 6 test suites for all React components
- **Store tests**: 3 test suites for reducer, selectors, and state logic
- **Context tests**: Provider initialization and error handling
- **Data validation tests**: Quiz data structure and integrity
- **Integration tests**: Feature flow and navigation testing

### Running Tests
```bash
npm test              # Run tests in watch mode
npm test -- --run    # Run tests once and exit
npm run test:ui      # Interactive test UI with results dashboard
npm run test:coverage # Generate and view coverage reports
```

## Key Concepts

### State Management Pattern
The app implements a **centralized store pattern** with clear separation:

1. **State** (`src/store/state/`): Defines the state shape and initial state
2. **Reducer** (`src/store/reducer/`): Pure functions that handle state transitions
3. **Actions** (`src/store/actions/`): Type-safe action definitions
4. **Selectors** (`src/store/selectors/`): Memoized custom hooks for efficient state access
5. **Context** (`src/context/`): Provides state and dispatch to components

### Quiz Actions
- `SELECT_ANSWER`: Store user's answer for a specific question
- `NEXT_QUESTION`: Navigate to the next question
### Quiz State Structure
```typescript
interface QuizState {
  currentQuestionIndex: number;  // Active question index
  answers: (number | null)[];    // User answers array
  status: 'quiz' | 'score';      // Current view (quiz or score)
}
```

### Quiz Actions
- `SELECT_ANSWER`: Store user's answer for a specific question
- `NEXT_QUESTION`: Navigate to the next question
- `PREVIOUS_QUESTION`: Navigate to previous question
- `JUMP_TO_QUESTION`: Jump to a specific question (with validation)
- `SUBMIT_QUIZ`: Finalize quiz and transition to score screen
- `RESTART_QUIZ`: Reset quiz to initial state

## Performance Optimizations

- **Memoized Selectors**: Score calculation and navigation state are memoized using `useMemo`
- **useCallback Hooks**: Event handlers maintain referential equality to prevent unnecessary re-renders
- **Efficient Dependencies**: All hook dependencies are carefully managed for optimal performance
- **React 19 Compatible**: Uses modern React patterns and concurrent features

## Development Best Practices

### Code Organization
- **Co-located tests**: Tests live in `__tests__` folders alongside source code
- **Single responsibility**: Each module has a clear, focused purpose
- **Type safety**: Full TypeScript coverage with strict typing
- **JSDoc comments**: All exported functions and components are documented

### Testing Strategy
- **Unit tests**: Individual functions and components in isolation
- **Integration tests**: Feature flows and component interactions
- **Data validation**: Quiz data structure integrity checks
- **Reducer tests**: All state transitions are covered

## Browser Support

Works in all modern browsers that support:
- ES2020+
- React 19+
- CSS Grid/Flexbox
- CSS Custom Properties

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Future Enhancements

- [ ] Add user authentication
- [ ] Persist quiz progress to localStorage
- [ ] Add timer for timed quizzes
- [ ] Create quiz administration panel
- [ ] Add mobile app using React Native
- [ ] Implement analytics tracking
- [ ] Add multiple quiz categories

## License

MIT License - see LICENSE file for details

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

