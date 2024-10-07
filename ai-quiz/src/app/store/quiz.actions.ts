// src/app/store/actions/quiz.actions.ts
import { createAction, props } from '@ngrx/store';

export const loadQuestions = createAction('[Quiz] Load Questions');
export const nextQuestion = createAction('[Quiz] Next Question');
export const resetQuiz = createAction('[Quiz] Reset Quiz');
export const markAnswer = createAction(
    '[Quiz] Mark Answer',
    props<{ isCorrect: boolean }>()
  );
