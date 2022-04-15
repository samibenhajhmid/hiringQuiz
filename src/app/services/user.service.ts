import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {User} from "../interfaces/user";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private path = `${environment.gatewayEndpoint}`;
  constructor(private httpClient: HttpClient) {
  }

  public loginUserRemote(user: User): Observable<any> {
    return this.httpClient.post("http://localhost:8080/clientLogin", user)
  }

  public registerUserRemote(user: User):Observable<any> {
    return this.httpClient.post("http://localhost:8080/users/create", user)
  }
}
