// src/app/components/quiz/quiz.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectCurrentQuestionIndex, selectTotalQuestions, selectQuestions, selectScore } from '../../store/quiz.selectors';
import { loadQuestions, nextQuestion } from '../../store/quiz.actions'
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, OnDestroy {
  currentQuestionIndex: number = 0;
  totalQuestions: number = 0;
  questions: any[] = [];
  subscriptions: Subscription = new Subscription();
  score: number = 0;
  timeLeft: number = 10;  // 9 minutes in seconds
  timer: any;


  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    // Load questions when the component initializes (if necessary)
    this.store.dispatch(loadQuestions()); 
    this.startTimer();
    // Subscribe to the current question index and total questions
    this.subscriptions.add(
      this.store.select(selectCurrentQuestionIndex).subscribe(index => {
        this.currentQuestionIndex = index;
      })

      
    );

    

    this.subscriptions.add(
      this.store.select(selectTotalQuestions).subscribe(total => {
        this.totalQuestions = total;
      })
    );

    // Load questions into the local variable if needed
    this.subscriptions.add(
      this.store.select(selectQuestions).subscribe(questions => {
        this.questions = questions; // Populate the questions array
      })
    );

    this.subscriptions.add(
      this.store.select(selectScore).subscribe(score => {
        this.score = score;
      })
    )

  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.timer);
        this.router.navigate(['/result'], { state: { score: this.score } })
         // Move to the next question or end quiz when time runs out
      }
    }, 1000);
  }

  nextQuestion() {
    
    if (this.currentQuestionIndex + 1 === this.totalQuestions) {
     
      this.router.navigate(['/result'], { state: { score: this.score } });
      clearInterval(this.timer);
    } else {
      this.store.dispatch(nextQuestion());
     
    } 
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // Clear the timer if it exists
    }
    this.subscriptions.unsubscribe(); 
  }
  getFormattedTime(): string {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`; // Formats as mm:ss
  }
}
