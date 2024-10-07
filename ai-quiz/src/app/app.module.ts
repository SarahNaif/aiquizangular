import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuestionComponent } from './components/question/question.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { StoreModule } from '@ngrx/store';
import { quizReducer } from './store/quiz.reducer';
import { ResultComponent } from './components/result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    QuestionComponent,
    WelcomeComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ quiz: quizReducer }),
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
