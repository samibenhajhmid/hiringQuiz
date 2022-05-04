import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {QuestionService} from "../../../shared/services/question.service";
import {QuizService} from "../../../shared/services/quiz.service";
import {Question} from "../../../shared/models/question";
import {AnswerService} from "../../../shared/services/answer.service";
import {CandidateAnswerService} from "../../../shared/services/candidate-answer.service";
import {CandidateAnswer} from "../../../shared/models/candidateAnswer";
import {SessionService} from "../../../shared/services/session.service";
import {Session} from "../../../shared/models/session";



@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.scss']
})
export class StartQuizComponent implements OnInit {
  actionBtn: string = "Next"
  selectedAnswer: string;
  isLoading: Boolean = false;
  questionData: Question[];
  answerData: any[] = [];
  private nbQuestions: number;
  private nbQuestionsInprogress: number;
  currentAnswer: CandidateAnswer = {
    id: undefined,
    description: undefined,
    relatedQuestion: undefined,
    relatedQuiz: undefined,
    relatedAssessment: undefined,
    relatedUser: undefined,
  };
  private session: Session = {
    id:undefined,
    relatedQuiz:undefined,
    passedTime:undefined,
    relatedAssessment:undefined,
    relatedUser:undefined

  };


  constructor(private candidateAnswerService: CandidateAnswerService, private sessionService: SessionService,
              private questionService: QuestionService, public quizService: QuizService, private answerService: AnswerService,
              public sanitizer: DomSanitizer, public router: Router) {
  }

  ngOnInit(): void {
    this.quizService.qnProgress = 0;
    this.quizService.seconds = 0;
    this.getQuizQuestionsData(history.state.quizId);
    console.log('------------->state')
    console.log(history.state)

  }

  public get valueAsStyle(): any {
    return this.sanitizer.bypassSecurityTrustStyle(`--progress-bar: ${this.getProgressValue}%`);
  }


  // Check prev available
  /* public get checkPrev(): Boolean {
     if (this.quizService.qnProgress - 1 >= 0) {
       return true;
     }
     return false;
   }

   */

  // Check next available
  public get checkNext(): Boolean {
    if (this.nbQuestionsInprogress) {
      return true;
    }
    return false;
  }

  // Get Progress Value
  public get getProgressValue() {
    const progressValue = (this.quizService.qnProgress + 1) * (100 / this.nbQuestions);
    return progressValue;
  }

  // Check if the radio is select or not
  // isRadioChecked(index: number) {
  //   if (this.quizService.questionData[this.quizService.qnProgress].participantAnswer === index) {
  //     return true;
  //   }
  //   return false;
  // }

  // Getting quiz data
  getQuizQuestionsData(quizId: any) {
    this.isLoading = true;
    this.questionService.getQuestionsByQuizService(quizId).subscribe(
      res => {
        this.questionData = res
        this.isLoading = false;
        this.startTimer();
        this.getQuestionsAnswerData()
        this.nbQuestions = res.length
        this.nbQuestionsInprogress = this.nbQuestions

      },
      () => {
        this.isLoading = false;
        console.log('error getting question Data for this quiz');
      }
    );
  }


  // Start timer
  startTimer() {
    this.quizService.timer = setInterval(() => {
      this.quizService.seconds++;
    }, 1000)
  }

  // Submit answer or click next
  submitCandidateAnswer() {
    this.currentAnswer.id = this.quizService.qnProgress;
    this.currentAnswer.description = this.selectedAnswer;
    this.currentAnswer.relatedQuestion = (this.questionData)[this.quizService.qnProgress].questionText;
    this.currentAnswer.relatedQuiz = history.state.relatedQuiz;
    this.currentAnswer.relatedAssessment = history.state.relatedAssessment;
    this.currentAnswer.relatedUser = history.state.passedData.userEmail;
    this.candidateAnswerService.addCandidateAnswers(this.currentAnswer).subscribe({
      next: res => {
        console.log(res)
      },
      error: () => {
        console.log("error while adding answer")
      }
    })
  }



  clickNextBtn() {
    if (this.checkNext) {
      this.nbQuestionsInprogress--;
      this.quizService.qnProgress++;
      if (this.nbQuestionsInprogress == 1) {
        this.actionBtn = 'Submit'
      }
      if (this.questionData.length == this.quizService.qnProgress) {
        console.log(this.quizService.timer)
        clearInterval(this.quizService.timer);
        this.goToHomePage();
      }
      this.submitCandidateAnswer()
    }


  }

  goToHomePage() {
    Swal.fire('Submited!', '<h2 class="text-success">Thank you for participing</h2>', 'success').then(() => {

      this.router.navigate(['/assessment', history.state.passedData.assessmentCode],
        {state: {assessmentCode: history.state.passedData.assessmentCode}});
      this.session.relatedQuiz= history.state.relatedQuiz;
      this.session.passedTime = this.quizService.timer;
      this.session.relatedAssessment = history.state.relatedAssessment;
      this.session.relatedUser=history.state.passedData.userEmail;
      this.sessionService.addSessionService(this.session).subscribe({
        next:(res)=>{
          console.log(res);
        },
        error: ()=>{
          console.log("error while adding records")

      }
      })

    })
  }

  // Prev question
  /* clickPrevBtn() {
     if (!this.checkPrev) {
       return;
     }
     this.quizService.qnProgress--;
     //this.allAnswers.pop();

   }

   */


  private getQuestionsAnswerData() {

    for (let element of this.questionData) {
      console.log(element.id)
      this.answerService.getAnswersByQuestionId(element.id).subscribe({
        next: res => {
          // console.log(res)
          this.answerData.push(res)
        },
        error: () => {
          alert("Error while getting answers")
        }
      })

    }


  }

}
