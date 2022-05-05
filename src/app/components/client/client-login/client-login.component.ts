import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import {User} from "../../../shared/models/user";
import {UserService} from "../../../shared/services/user.service";

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.css']
})
export class ClientLoginComponent implements OnInit {
  user  = new User();
  msg = '';


  constructor(private _service : UserService, private _route : Router) {

  }
  ngOnInit(): void {
  }
userLogin(){
    this._service.loginUserRemote(this.user).subscribe(
      data => {console.log("response recieved");
        this._route.navigate(['/clientDashboard'])

      },
        error => {console.log("Exception occured");
      this.msg = 'Bad Credentials , please enter valid email and password'}
        )
}

  goToRegistration() {
    console.log("hello");
    this._route.navigate(['/registration']);
  }
}
