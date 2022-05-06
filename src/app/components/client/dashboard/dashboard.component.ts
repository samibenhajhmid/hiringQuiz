import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', "../../../../assets/dashboard/css/main.css"]
})
export class DashboardComponent implements OnInit {
  displayAssessments=true;
  displaySessions=false;
  displayQuestions=false;
  displayQuizzes=false;
  displayCandidates=false;
  constructor() { }

  ngOnInit(): void {
  }


  getDisplay(element: string) {
    switch (element) {
      case 'assessments':
        this.displayAssessments = true;
        console.log('assessments')
        break;
      case 'candidates':
        this.displayCandidates = true;
        console.log('candidates')
        break;
      case 'quizzes':
        this.displayQuizzes = true;
        console.log('quizzes')
        break;
      case 'questions':
        this.displayQuestions = true;
        console.log('questions')
        break;

      default:
        this.displayAssessments = true;
    }
  }
}
