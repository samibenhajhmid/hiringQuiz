import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {CandidateAnswer} from "../models/candidateAnswer";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CandidateAnswerService {

  constructor(private http:HttpClient) { }

  addCandidateAnswers(candidateAnswer:CandidateAnswer):Observable<any> {
    return this.http.post('http://localhost:8080/api/candidatesAnswers/create', candidateAnswer);
  }
}
