import { Injectable } from '@angular/core';
import { Observable} from "rxjs";

import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

import {Assessment} from "../models/assessment";


@Injectable({
  providedIn: 'root'
})
export class AssessmentService {
  private resourceUrl = `${environment.gatewayEndpoint}` + 'assessments';

  constructor(private http: HttpClient) {
  }

  removeAssessmentById(id: string): Promise<void> {
    return this.http.delete<void>(`${this.resourceUrl}/${id}`).toPromise();
  }

  getAllAssessmentsService(): Observable<any> {
    return this.http.get('http://localhost:8080/api/assessments')
  }

  getAssessmentByIdService(id: string): Observable<any> {
    return this.http.get(`${this.resourceUrl}/assessments/${id}`)
  }

  updateAssessmentService(id: any, assessment: Assessment): Observable<any> {
    return this.http.put(`${this.resourceUrl}/update/${id}`, assessment)
  }

  addAssessmentService(assessment: Assessment):Observable<any>{
    return this.http.post('http://localhost:8080/api/assessments/create', assessment);
  }

}
