import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Answer} from "../interfaces/answer";
import {Observable} from "rxjs";
import {Question} from "../interfaces/question";


@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private resourceUrl = `${environment.gatewayEndpoint}`+'answers';
private answer: Answer;
  constructor(private http: HttpClient) {}

  getAllAnswersService(): Observable<any> {
    return this.http.get('http://localhost:8080/api/answers')
  }



  addAnswerService(answer: Answer):Observable<any>{
    return this.http.post('http://localhost:8080/api/answers/create', answer);
  }

  getAnswersByQuestionId(id:any):Observable<any> {
    return this.http.get(`${this.resourceUrl}/question/${id}`)

  }
}

