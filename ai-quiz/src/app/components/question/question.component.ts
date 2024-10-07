import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Question } from '../../data/questions';
import { Store } from '@ngrx/store';
import { markAnswer } from '../../store/quiz.actions';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent {
  @Input() question!: Question;
  @Input() currentQuestionIndex!: number;
  @Input() totalQuestions!: number;
  @Output() answerSelected = new EventEmitter<string>();

  selectedAnswers: (string | null)[] = [];
  isCorrect: boolean | null = null;

  constructor(private store: Store) {
    this.selectedAnswers = new Array(this.totalQuestions).fill(null);
  }
  ngOnInit() {
    // Reset selected answer for the current question when it initializes
    if (this.currentQuestionIndex < this.selectedAnswers.length) {
      this.selectedAnswers[this.currentQuestionIndex] = null;
    }
  }
  
  selectAnswer(answer: string) {
    if (!this.selectedAnswers[this.currentQuestionIndex]) {
    this.selectedAnswers[this.currentQuestionIndex] = answer;
    this.isCorrect = answer === this.question.answer;
    console.log('Selected answer:', answer); 
    // You can handle the answer logic here, dispatch an action, etc.
    this.store.dispatch(markAnswer({ isCorrect: this.isCorrect,  }));
    this.answerSelected.emit();  // Emit event after answer selection
    }
  }

  getButtonClass(answer: string): string {
    if (this.selectedAnswers[this.currentQuestionIndex] === answer) {
      return this.isCorrect 
        ? ' border-green-500 bg-green-100' 
        : 'border-red-500 bg-red-100';
    }
    return 'border-blue-200 bg-sky-50';
  }

  isButtonDisabled(answer: string): boolean {
    return !!this.selectedAnswers[this.currentQuestionIndex]; // Disable if an answer has been selected
  }


  getIcon(answer: string): string {
    if (this.selectedAnswers[this.currentQuestionIndex] === answer) {
      return this.isCorrect ? 'fa-circle-check text-green-500' : 'fa-circle-xmark text-red-500';
    }
    return '';
  }
}
