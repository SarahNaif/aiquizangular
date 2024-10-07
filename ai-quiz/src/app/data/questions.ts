export interface Question {
  question: string;
  options: string[];
  answer: string;
}

export const questions: Question[] = [
  {
    question: 'Angular Uses What For Injection?',
    options: ['Services', 'Components', 'Modules', 'Directives'],
    answer: 'Services'
  },
  {
    question: 'Angular Component Is What Class?',
    options: ['A Class', 'A Module', 'A Service', 'A Directive'],
    answer: 'A Class'
  },
  {
    question: 'Which Syntax For Property Binding?',
    options: ['{{ }}', '( )', '[ ]', '< >'],
    answer: '[ ]'
  },
  {
    question: 'RxJS Used For What Purpose?',
    options: ['Routing', 'HTTP Requests', 'State Management', 'Reactive Programming'],
    answer: 'Reactive Programming'
  },
  {
    question: 'Lifecycle Hook After Properties Initialized?',
    options: ['ngOnInit', 'ngOnDestroy', 'ngOnChanges', 'ngAfterViewInit'],
    answer: 'ngOnInit'
  }
  
  ];
  