# Anchor Task - Interactive Quiz Application

A modern, responsive React 19 quiz application built with TypeScript, Material-UI, and Tailwind CSS v4. The app features state management using Context API and a reducer pattern, with a clean separation of concerns using a store-based architecture.

## Features

- **Interactive Quiz Interface**: Display questions with multiple-choice answers
- **Progress Tracking**: Navigate through questions with Next/Previous buttons
- **Answer Validation**: Only allow submission when all questions are answered
- **Score Calculation**: Automatic score computation and percentage display
- **Navigation Control**: Tab-based navigation with intelligent gating (restrict access to unanswered questions)
- **Responsive Design**: Mobile-friendly UI using Tailwind CSS v4 and Material-UI v7
- **React 19 Compatible**: Built with modern React 19 stable release and concurrent features
- **Comprehensive Testing**: 76+ tests with excellent coverage
- **Code Quality**: Refactored and prettified codebase with consistent formatting

## Tech Stack

- **Frontend Framework**: React 19.2.3 (stable)
- **Language**: TypeScript 5.9.3
- **UI Library**: Material-UI (MUI) v7.3.6
- **Styling**: Tailwind CSS v4.1.18 with @tailwindcss/postcss
- **Build Tool**: Vite 7.3.0
- **Test Framework**: Vitest 4.0.16
- **Testing Library**: @testing-library/react 16.3.1
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

Comprehensive test suite with **76 tests** across 14 test files, achieving excellent code coverage.

### Test Categories

**Component Tests (23 tests)**
- **App Component** (4 tests): Core functionality, conditional rendering, quiz flow
- **Navbar Component** (14 tests): Rendering, accessibility, state management, navigation, answer validation, disabled states
- **QuestionCard Component** (8 tests): Question rendering, options display, answer selection, edge cases
- **QuizNavigation Component** (3 tests): Button states, navigation controls
- **ScoreScreen Component** (4 tests): Final score display, restart functionality

**Store Tests (22 tests)**
- **Reducer Tests** (9 tests): All state transitions, action handling, edge cases
- **Selector Tests** (4 tests): Hook selectors, state queries
- **Custom Hook Tests** (3 tests): useCurrentQuestion, memoization behavior
- **State Management Tests** (6 tests): Initialization, state shape validation

**Context & Integration Tests (13 tests)**
- **Context Tests** (4 tests): Provider setup, useQuiz hook, error handling
- **Integration Tests** (9 tests): Quiz flow, navigation, answer submission, restart functionality

**Mock Data Tests (9 tests)**
- Data structure validation, answer correctness, content integrity

### Running Tests
```bash
npm test              # Run all tests in watch mode
npm run test -- --run # Run tests once and exit
npm run test:ui       # Interactive test UI dashboard
npm run test:coverage # Generate coverage report
```

## Key Concepts

### State Management Pattern
The app implements a **centralized store pattern** with clear separation:

1. **State** (`src/store/state/`): Defines the state shape and initial state
2. **Reducer** (`src/store/reducer/`): Pure functions that handle state transitions
3. **Actions** (`src/store/actions/`): Type-safe action definitions
4. **Selectors** (`src/store/selectors/`): Memoized custom hooks for efficient state access
5. **Context** (`src/context/`): Provides state and dispatch to components

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

### React 19 Compiler Integration
The project leverages React 19's new compiler which provides automatic optimization:

- **Automatic Memoization**: React 19 compiler automatically handles component memoization without explicit `useMemo` or `useCallback`
- **Smart Dependency Tracking**: The compiler intelligently tracks dependencies, eliminating the need for manual dependency arrays in most cases
- **Minimal Boilerplate**: Removed 8+ unnecessary `useCallback` and `useMemo` hooks that the compiler now handles automatically

### Strategic Memoization
Despite React 19 compiler optimizations, we retain `useMemo` for genuinely expensive operations:

- **useScore Hook**: Only memoized selector that performs array iteration to calculate quiz score
- **Rationale**: Prevents unnecessary recalculation of score during frequent state updates
- **Other selectors**: Use direct state access without memoization (React 19 compiler optimizes these)

### Additional Optimizations
- **Event Handlers**: Simple callbacks are inlined without `useCallback` wrapper
- **Efficient Context**: Context accessed only by components that need specific data
- **Optimized Dependencies**: All remaining hook dependencies are carefully managed
- **Bundle Size**: Vite's tree-shaking removes unused code for optimal production builds

## Development Best Practices

### Code Organization
- **Co-located tests**: Tests live in `__tests__` folders alongside source code for easy discovery
- **Single responsibility**: Each module has a clear, focused purpose
- **Type safety**: Full TypeScript coverage with strict typing enabled
- **Store-based architecture**: Centralized state management in `/store` folder with organized subdirectories

### Code Quality Standards
- **Consistent Formatting**: Standardized 2-space indentation throughout the codebase
- **Import Organization**: Alphabetically sorted imports for consistency and maintainability
- **JSDoc Comments**: All exported functions and components are documented with comprehensive comments
- **Type Precision**: Removed unnecessary type annotations where inference is clear
- **Clean Code**: Removed unnecessary utility wrappers that add complexity

### Testing Strategy
- **Unit Tests**: Individual functions and components tested in isolation
- **Integration Tests**: Feature flows and component interactions validated
- **Data Validation**: Quiz data structure integrity checks
- **Reducer Tests**: All state transitions covered with comprehensive test cases
- **Component Tests**: 76 tests across 14 test files ensuring robust coverage

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

