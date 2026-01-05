export interface Question {
  id: number;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
}

export const quizQuestions: Question[] = [
  {
    id: 1,
    questionText: "What does JSX stand for?",
    options: [
      "JavaScript XML",
      "JavaScript Extension",
      "JSON Syntax Extension",
      "Java Syntax XML",
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 2,
    questionText: "What is the primary difference between props and state?",
    options: [
      "Props are mutable, state is immutable",
      "State is passed from parent to child, props are managed internally",
      "Props are for external configuration, state is for internal component data",
      "There is no difference",
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 3,
    questionText: "What is the purpose of the `useEffect` hook in React?",
    options: [
      "To perform side effects in function components",
      "To manage component's internal state",
      "To replace `useState` for complex state logic",
      "To directly manipulate the DOM",
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 4,
    questionText: "Why are `keys` important when rendering a list of elements in React?",
    options: [
      "They are a required prop for all components",
      "They help React identify which items have changed, are added, or are removed",
      "They provide a unique CSS selector for styling",
      "They are used to pass data to child components",
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 5,
    questionText: "Which of the following is a primary cause for a React component to re-render?",
    options: [
      "The component's props have not changed",
      "A call to an external API",
      "A change in the component's state",
      "The browser window is resized",
    ],
    correctAnswerIndex: 2,
  },
];
