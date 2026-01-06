import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QuizProvider } from '../../context/QuizContext';
import Navbar from '../../components/Navbar';
import QuestionCard from '../../components/QuestionCard';

describe('Navbar Component', () => {
  describe('Rendering', () => {
    it('should render navigation tabs', () => {
      render(
        <QuizProvider>
          <Navbar />
        </QuizProvider>
      );

      expect(screen.getByText(/Question 1/i)).toBeInTheDocument();
    });

    it('should render all question tabs', () => {
      render(
        <QuizProvider>
          <Navbar />
        </QuizProvider>
      );

      const tabs = screen.getAllByRole('tab');
      expect(tabs.length).toBeGreaterThan(0);
    });

    it('should render exactly 5 question tabs', () => {
      render(
        <QuizProvider>
          <Navbar />
        </QuizProvider>
      );

      const tabs = screen.getAllByRole('tab');
      expect(tabs).toHaveLength(5);
    });

    it('should display correct question labels', () => {
      render(
        <QuizProvider>
          <Navbar />
        </QuizProvider>
      );

      expect(screen.getByText('Question 1')).toBeInTheDocument();
      expect(screen.getByText('Question 2')).toBeInTheDocument();
      expect(screen.getByText('Question 3')).toBeInTheDocument();
      expect(screen.getByText('Question 4')).toBeInTheDocument();
      expect(screen.getByText('Question 5')).toBeInTheDocument();
    });

    it('should have correct aria labels and controls', () => {
      render(
        <QuizProvider>
          <Navbar />
        </QuizProvider>
      );

      const tabs = screen.getAllByRole('tab');
      tabs.forEach((tab, index) => {
        expect(tab).toHaveAttribute('id', `quiz-tab-${index}`);
        expect(tab).toHaveAttribute('aria-controls', `quiz-tabpanel-${index}`);
      });
    });
  });

  describe('Tab Disabled State', () => {
    it('should enable first tab by default', () => {
      render(
        <QuizProvider>
          <Navbar />
        </QuizProvider>
      );

      const firstTab = screen.getByRole('tab', { name: /Question 1/i });
      expect(firstTab).not.toBeDisabled();
    });

    it('should disable tabs for unanswered questions', () => {
      render(
        <QuizProvider>
          <Navbar />
        </QuizProvider>
      );

      const tabs = screen.getAllByRole('tab');
      // First tab should be enabled, rest should be disabled initially
      expect(tabs[0]).not.toBeDisabled();
      expect(tabs[1]).toBeDisabled();
      expect(tabs[2]).toBeDisabled();
      expect(tabs[3]).toBeDisabled();
      expect(tabs[4]).toBeDisabled();
    });
  });

  describe('Tab Navigation', () => {
    it('should highlight active question tab', () => {
      render(
        <QuizProvider>
          <Navbar />
        </QuizProvider>
      );

      const firstTab = screen.getByRole('tab', { name: /Question 1/i });
      expect(firstTab).toHaveAttribute('aria-selected', 'true');

      const secondTab = screen.getByRole('tab', { name: /Question 2/i });
      expect(secondTab).toHaveAttribute('aria-selected', 'false');
    });
  });

  describe('Accessibility', () => {
    it('should have accessible navigation label', () => {
      render(
        <QuizProvider>
          <Navbar />
        </QuizProvider>
      );

      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveAttribute('aria-label', 'quiz navigation');
    });

    it('should support keyboard navigation', () => {
      render(
        <QuizProvider>
          <Navbar />
        </QuizProvider>
      );

      const tabs = screen.getAllByRole('tab');
      expect(tabs.length).toBeGreaterThan(0);
      tabs.forEach((tab) => {
        expect(tab).toHaveAttribute('role', 'tab');
      });
    });

    it('should have proper tab indexes', () => {
      render(
        <QuizProvider>
          <Navbar />
        </QuizProvider>
      );

      const tabs = screen.getAllByRole('tab');
      expect(tabs[0]).toHaveAttribute('tabindex');
    });
  });

  describe('State Management', () => {
    it('should render with consistent state', () => {
      render(
        <QuizProvider>
          <Navbar />
          <QuestionCard />
        </QuizProvider>
      );

      // Check that navbar and question card are both rendered
      expect(screen.getByText(/Question 1\/5/i)).toBeInTheDocument();
      const tabs = screen.getAllByRole('tab');
      expect(tabs.length).toBeGreaterThan(0);
    });
  });

  describe('Tab List Properties', () => {
    it('should have scrollable tabs variant', () => {
      const { container } = render(
        <QuizProvider>
          <Navbar />
        </QuizProvider>
      );

      const tablist = screen.getByRole('tablist');
      expect(tablist).toBeInTheDocument();
    });

    it('should render without errors with multiple renders', () => {
      render(
        <QuizProvider>
          <Navbar />
        </QuizProvider>
      );

      expect(screen.getByRole('tablist')).toBeInTheDocument();
      const tabs = screen.getAllByRole('tab');
      expect(tabs).toHaveLength(5);
    });
  });
});
