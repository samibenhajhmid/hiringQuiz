import { Injectable } from '@angular/core';
import { Observable} from "rxjs";
import {Quiz} from "../models/quiz";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private resourceUrl = `${environment.gatewayEndpoint}` + 'quizzes';
  seconds: number;
  timer;
  qnProgress: number;
  passedList= [];

  constructor(private http: HttpClient) {
  }
  removeQuizById(id: string): Promise<void> {
    return this.http.delete<void>(`${this.resourceUrl}/${id}`).toPromise();
  }

  getAllQuizzesService(): Observable<any> {
    return this.http.get(`${this.resourceUrl}`)
  }


  updateQuizService(id: any, quiz: Quiz): Observable<any> {
    return this.http.put(`${this.resourceUrl}/update/${id}`, quiz)
  }


addQuizService(quiz: Quiz):Observable<any>{
    return this.http.post(`${this.resourceUrl}/create`, quiz);
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

}





