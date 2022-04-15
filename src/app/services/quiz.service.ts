import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Quiz} from "../interfaces/quiz";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private path = `${environment.gatewayEndpoint}`;
  //public placeholderMembers: Quiz[] = GLOBAL._DB.members;

  constructor(private httpClient: HttpClient) { }



 // getAllQuizs(): Promise<Quiz[]> {
   // return this.httpClient.get<Quiz[]>(`${this.path}/quisz`).toPromise();

 // }
  removeQuizById(id: string): Promise<void> {
    return this.httpClient.delete<void>(`${this.path}/quizs/${id}`).toPromise();
    //this.placeholderMembers = this.placeholderMembers.filter(item => item.id !== id);
   // return new Promise(resolve => resolve());
  }

  public addQuizService(quiz: Quiz):Observable<any> {
    return this.httpClient.post("http://localhost:8080/quizs/create", quiz)
  }

  getQuizsService(): Observable<any>{
  return this.httpClient.get('http://localhost:8080/quizs')
  }

  /*editQuizService(id: string):Observable<any>{
    return this.httpClient.put(`${this.path}/quizs/update${id}`)
  }
  */

  getQuizsByIdService(id: string):Observable<any>{
    return this.httpClient.get(`${this.path}/quizs/${id}`)
  }
}
