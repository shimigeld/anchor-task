import { describe, it, expect } from 'vitest';
import { quizQuestions } from '../../mock/quizMockData';

describe('Quiz Data', () => {
  it('should have all questions defined', () => {
    expect(quizQuestions).toBeDefined();
    expect(Array.isArray(quizQuestions)).toBe(true);
  });

  it('should have 5 questions', () => {
    expect(quizQuestions).toHaveLength(5);
  });

  it('should have required properties for each question', () => {
    quizQuestions.forEach((question, index) => {
      expect(question).toHaveProperty('id');
      expect(question).toHaveProperty('questionText');
      expect(question).toHaveProperty('options');
      expect(question).toHaveProperty('correctAnswerIndex');
      expect(question.id).toBe(index + 1);
    });
  });

  it('should have correct answer indices within range', () => {
    quizQuestions.forEach((question) => {
      expect(question.correctAnswerIndex).toBeGreaterThanOrEqual(0);
      expect(question.correctAnswerIndex).toBeLessThan(question.options.length);
    });
  });

  it('should have at least 3 options per question', () => {
    quizQuestions.forEach((question) => {
      expect(question.options.length).toBeGreaterThanOrEqual(3);
    });
  });

  it('should have non-empty question text', () => {
    quizQuestions.forEach((question) => {
      expect(question.questionText).toBeTruthy();
      expect(question.questionText.length).toBeGreaterThan(0);
    });
  });

  it('should have non-empty options', () => {
    quizQuestions.forEach((question) => {
      question.options.forEach((option) => {
        expect(option).toBeTruthy();
        expect(option.length).toBeGreaterThan(0);
      });
    });
  });

  it('should have JSX as first question', () => {
    expect(quizQuestions[0].questionText).toContain('JSX');
  });

  it('should have props vs state as second question', () => {
    expect(quizQuestions[1].questionText).toContain('props');
  });
});
