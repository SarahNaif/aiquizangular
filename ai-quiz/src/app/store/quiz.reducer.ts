// src/app/store/reducers/quiz.reducer.ts
import { createReducer, createSelector, on } from '@ngrx/store';
import { loadQuestions, nextQuestion, resetQuiz , markAnswer} from './quiz.actions';
import { questions } from '../data/questions'; // Import your questions


export interface QuizState {
  score: number;
  currentQuestionIndex: number;
  totalQuestions: number;
  questions: any[];

}

export const initialState: QuizState = {
  score: 0,
  currentQuestionIndex: 0,
  totalQuestions: questions.length,
  questions: questions,
 
};




export const quizReducer = createReducer(
  initialState,
  on(loadQuestions, state => ({ ...state, totalQuestions: questions.length })),
  on(nextQuestion, state => ({
    ...state,
    currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, state.totalQuestions - 1)
  })),
  on(markAnswer, (state, { isCorrect }) => ({
    ...state,
    score: isCorrect ? state.score + 1 : state.score,
    
  })),
  on(resetQuiz, () => initialState)
);

