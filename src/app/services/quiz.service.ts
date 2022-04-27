import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {Quiz} from "../interfaces/quiz";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {IQuiz} from "../shared/model/quiz.model";
import {Router} from "@angular/router";
import {Question} from "../interfaces/question";

type EntityResponseType = HttpResponse<IQuiz>;
type EntityArrayResponseType = HttpResponse<IQuiz[]>;

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private resourceUrl = `${environment.gatewayEndpoint}` + 'quizzes';
  readonly quizDataUrl = "./assets/data/quiz-data.json";
  readonly rootUrl = "http://localhost:4200";
  questionData: Question[] = [];
  seconds: number;
  timer;
  qnProgress: number;
  correctAnsCount: number = 0;


  constructor(private http: HttpClient, private router:Router) {
  }

  removeQuizById(id: string): Promise<void> {
    return this.http.delete<void>(`${this.resourceUrl}/${id}`).toPromise();
  }

  getAllQuizzesService(): Observable<any> {
    return this.http.get('http://localhost:8080/api/quizzes')
  }

  getQuizsByIdService(id: string): Observable<any> {
    return this.http.get(`${this.resourceUrl}/quizzes/${id}`)
  }

  updateQuizService(id: any, quiz: Quiz): Observable<any> {
    return this.http.put(`${this.resourceUrl}/update/${id}`, quiz)
  }

  getQuizByTitleService(title: string): Observable<any> {
    return this.http.get(`${this.resourceUrl}/${title}`)
  }

addQuizService(quiz: Quiz):Observable<any>{
    return this.http.post('http://localhost:8080/api/quizzes/create', quiz);
}
getQuizzesByAssessmentCode(assessmentCode:string):Observable<any>{
    return this.http.get(`${this.resourceUrl}/assessment/${assessmentCode}`)
}

// Timer
  displayTimeElapsed() {
    const hours = Math.floor(this.seconds / 3600) < 10 ? '0' + Math.floor(this.seconds / 3600) : Math.floor(this.seconds / 3600);
    const minutes = Math.floor((this.seconds / 60) % 60) < 10 ? '0' + Math.floor((this.seconds / 60) % 60) : Math.floor((this.seconds / 60) % 60);
    const seconds = Math.floor(this.seconds % 60) < 10 ? '0' + Math.floor(this.seconds % 60) : Math.floor(this.seconds % 60);
    return `${hours} : ${minutes} : ${seconds}`;
  }

  signOut() {
    localStorage.clear();
    clearInterval(this.timer);
    this.router.navigate(['/']);
  }
}





