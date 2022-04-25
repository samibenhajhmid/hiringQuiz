import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {Quiz} from "../interfaces/quiz";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {IQuiz} from "../shared/model/quiz.model";

type EntityResponseType = HttpResponse<IQuiz>;
type EntityArrayResponseType = HttpResponse<IQuiz[]>;

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private resourceUrl = `${environment.gatewayEndpoint}` + 'quizzes';

  constructor(private http: HttpClient) {
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
}
