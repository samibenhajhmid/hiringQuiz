import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Session} from "../models/session";

@Injectable({
  providedIn: 'root'
})


export class SessionService {
  private resourceUrl = `${environment.gatewayEndpoint}` + 'sessions';


  constructor(private http: HttpClient) {
  }

  removeSessionById(id: string): Promise<void> {
    return this.http.delete<void>(`${this.resourceUrl}/${id}`).toPromise();
  }

  getAllSessionsService():Observable<any> {
    return this.http.get(`${this.resourceUrl}`);

  }
  addSessionService(session:Session):Observable<any>{
    return this.http.post(`${this.resourceUrl}/create`, session)
  }
}
