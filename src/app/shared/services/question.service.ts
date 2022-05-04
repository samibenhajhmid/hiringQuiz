import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Question} from "../models/question";


@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private resourceUrl = `${environment.gatewayEndpoint}`+'questions';
  constructor(private http: HttpClient) { }


  removeQuestionById(id: string): Promise<void> {
    return this.http.delete<void>(`${this.resourceUrl}/${id}`).toPromise();
  }

  getAllQuestionsService(): Observable<any> {
    return this.http.get('http://localhost:8080/api/questions')
  }

  updateQuestionService(id: any, question: Question): Observable<any> {
    return this.http.put(`${this.resourceUrl}/update/${id}`, question)
  }

  addQuestionService(question: Question):Observable<any>{
    return this.http.post('http://localhost:8080/api/questions/create', question);
  }

  getQuestionsByQuizService(quizId: any):Observable<any>
  {
    return this.http.get(`${this.resourceUrl}/quiz/${quizId}`)
  }


}
