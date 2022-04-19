import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Quiz} from "../interfaces/quiz";
import {Question} from "../interfaces/question";
import {QuizService} from "./quiz.service";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private path = `${environment.gatewayEndpoint}`;
  private quiz:Quiz
  constructor(private httpClient: HttpClient, private quizService: QuizService) { }

  getQuestionsByQuizIdService(id: string): Observable<any>{
    return this.httpClient.get(`${this.path}/questions/quiz/${id}`)
  }
  removeQuestionById(id: string): Promise<void> {
    return this.httpClient.delete<void>(`${this.path}/questions/${id}`).toPromise();
    //this.placeholderMembers = this.placeholderMembers.filter(item => item.id !== id);
    // return new Promise(resolve => resolve());
  }
  public addQuestionService(question: Question):Observable<any> {

    return this.httpClient.post("http://localhost:8080/questions/create", question)
  }
  updateQuestionService(id: string, question: any ):Observable<any>{
    return this.httpClient.put(`${this.path}/questions/update/${id}`, question)}

  getAllQuestionsService():Observable<any> {
    return this.httpClient.get('http://localhost:8080/questions/')
  }

}

