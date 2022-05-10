import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private resourceUrl = `${environment.gatewayEndpoint}`;
  constructor(private http: HttpClient) { }


  verifyToken(token): Observable<any> {
    return this.http.post(this.resourceUrl + 'token/verify', token, {
      headers: new HttpHeaders({ 'Content-Type': 'text/plain' })
    });
  }

  resendToken(token): Observable<any> {
    return this.http.post(this.resourceUrl + 'token/resend', token, {
      headers: new HttpHeaders({ 'Content-Type': 'text/plain' })
    });
  }
}
