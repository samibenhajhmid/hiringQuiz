
import { Component,HostListener, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {QuestionModal, Quiz} from "../../../interfaces/quiz";
import {MatRadioChange} from "@angular/material/radio";
import {QuestionService} from "../../../services/question.service";
import {QuizService} from "../../../services/quiz.service";
import {Question} from "../../../interfaces/question";
import {AnswerService} from "../../../services/answer.service";
import {Answer} from "../../../interfaces/answer";
import {CandidateAnswerService} from "../../../services/candidate-answer.service";


@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.scss']
})
export class StartQuizComponent implements OnInit {
  i= 0;
  selectedAnswer: string;
  isLoading: Boolean = false;
  questionData:Question[];
  answerData: any[] =[];
  private answer: any;

  constructor(private candidateAnswer: CandidateAnswerService, private questionService: QuestionService, public quizService: QuizService, private answerService: AnswerService, public sanitizer: DomSanitizer, public router: Router) { }

  ngOnInit(): void {
    this.quizService.qnProgress = 0;
    this.quizService.seconds = 0;
    this.getQuizQuestionsData(1);
    // this.quizService.addData({ answer: 0, imageName: " ", options: ["True", "False"], question: "Is 'undefined' a data type in javascript?" });
  }

  public get valueAsStyle(): any {
    return this.sanitizer.bypassSecurityTrustStyle(`--progress-bar: ${this.getProgressValue}%`);
  }

  // Check prev available
  public get checkPrev(): Boolean {
    if (this.quizService.qnProgress - 1 >= 0) {
      return true;
    }
    return false;
  }

  // Check next available
  public get checkNext(): Boolean {
    if (1) {
      return true;
    }
    return false;
  }
  // Get Progress Value
  public get getProgressValue() {
    const progressValue = (this.quizService.qnProgress + 1) * (100 / this.quizService.questionData.length);
    return progressValue;
  }

  // Check if the radio is select or not
  // isRadioChecked(index: number) {
  //   if (this.quizService.questionData[this.quizService.qnProgress].participantAnswer === index) {
  //     return true;
  //   }
  //   return false;
  // }

  // To filter the data
  filterData(id, data) {
    return {
      id: id,
      options: data.options,
      question: data.question,
      participantAnswer: -1
    }
  }
  // Getting quiz data
  getQuizQuestionsData(quizId:any) {
    this.isLoading = true;
    this.questionService.getQuestionsByQuizService(quizId).subscribe(
      res => {
        console.log(res)
        this.questionData = res
        this.isLoading = false;
        this.startTimer();
        this.getQuestionsAnswerData()
      },
      err => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }


  radioChange(event: MatRadioChange) {
    this.quizService.questionData[this.quizService.qnProgress].participantAnswer = event.value;
  }

  // Start timer
  startTimer() {
    this.quizService.timer = setInterval(() => {
      this.quizService.seconds++;
    }, 1000)
  }

  // Submit answer or click next
  clickNextBtn() {
    console.log(this.selectedAnswer)
    if (this.checkNext) {
      this.quizService.qnProgress++;
      if (this.quizService.questionData.length == this.quizService.qnProgress) {
        clearInterval(this.quizService.timer);
        this.router.navigate(['/result']);
        return;
      }
    }
  }

  // Prev question
  clickPrevBtn() {
    if (!this.checkPrev) {
      return;
    }
    this.quizService.qnProgress--;

  }

  private getQuestionsAnswerData() {

    for (let element of this.questionData){
      console.log(element.id)
      this.answerService.getAnswersByQuestionId(element.id).subscribe({
        next: res=>{
         // console.log(res)
          this.answerData.push(res)
        },
        error :()=>{
          alert("Error while getting answers")
        }
      })

    }


  }

  submitAnswers() {
    this.candidateAnswer.addCandidateAnswers().subscribe({
      next: res=>{
        console.log(res)
        alert("Answers Added Successfully")
      },
      error:()=>{
        alert("Error while Adding Answers")
      }
    })
  }
}
