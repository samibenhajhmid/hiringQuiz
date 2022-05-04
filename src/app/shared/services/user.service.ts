import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {User} from "../models/user";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private resourceUrl = `${environment.gatewayEndpoint}`+'users';


  constructor(private http: HttpClient) {
  }

  public loginUserRemote(user: User): Observable<any> {
    return this.http.post("http://localhost:8080/api/clientLogin", user)
  }

  public registerUserRemote(user: User):Observable<any> {
    return this.http.post("http://localhost:8080/api/users/create", user)
  }
  public getAllCandidatesService():Observable<any>{
    return this.http.get("http://localhost:8080/api/candidates/")
  }

  public removeUserByIdService(id: string): Promise<void> {
    return this.http.delete<void>(`${this.resourceUrl}/${id}`).toPromise();


  }


  updateUserService(id: any, user: User): Observable<any> {
    return this.http.put(`${this.resourceUrl}/update/${id}`, user)
  }

  candidateLoginService(user: any) {
    return this.http.post("http://localhost:8080/api/assessmentTakerLogin", user)

  }
}
