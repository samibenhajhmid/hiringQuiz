import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Answer} from "../models/answer";
import {Observable} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private resourceUrl = `${environment.gatewayEndpoint}`+'answers';
  relatedQuestion:string;

  constructor(private http: HttpClient) {}


  addAnswerService(answer: Answer):Observable<any>{
    return this.http.post('http://localhost:8080/api/answers/create', answer);
  }

  getAnswersByQuestionId(id:any):Observable<any> {
    return this.http.get(`${this.resourceUrl}/question/${id}`)

  }


  removeAnswerById(id: string): Promise<void> {
    return this.http.delete<void>(`${this.resourceUrl}/${id}`).toPromise();
  }

  updateAnswerService(id: any, answer: any): Observable<any> {
    return this.http.put(`${this.resourceUrl}/update/${id}`, answer)
  }
}

