import { Component, EventEmitter, Output, output } from '@angular/core';
import { Router } from '@angular/router';
import { resetQuiz } from '../../store/quiz.actions';
import { Store } from '@ngrx/store';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {
  score!: number;


  constructor(private router: Router, private store: Store){
    // Retrieve the score from the router state
    const navigation = this.router.getCurrentNavigation();
    this.score = navigation?.extras.state ? (navigation.extras.state as { score: number })['score'] : 0; // Default to 0 if not found
  }

  ngOnInit(): void {
    // Emit the score to the parent component (AppComponent)
    if (this.score >= 4) {
      this.triggerConfetti();
    }
  }

  
  triggerConfetti(): void {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  restartQuiz() {
    // Reset the quiz score in the store
    this.store.dispatch(resetQuiz());
    
    // Navigate back to the quiz component
    this.router.navigate(['/']);
  }
}
