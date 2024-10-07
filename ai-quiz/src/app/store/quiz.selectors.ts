// src/app/store/selectors/quiz.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuizState } from './quiz.reducer';
export const selectQuizState = createFeatureSelector<QuizState>('quiz');

export const selectCurrentQuestionIndex = createSelector(
  selectQuizState,
  (state: QuizState) => state.currentQuestionIndex
);

export const selectTotalQuestions = createSelector(
  selectQuizState,
  (state: QuizState) => state.totalQuestions
);

export const selectQuestions = createSelector(
    selectQuizState,
    (state: QuizState) => state.questions
  );

export const selectScore = createSelector(
    selectQuizState,
    (quizState: any) => quizState.score
  );