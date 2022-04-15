import { Component, OnInit } from '@angular/core';
import {User} from "../../interfaces/user";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  msg= '';
  user = new User();

  constructor(private _service: UserService, private _router : Router) { }

  ngOnInit(): void {
  }

  registerUser() {
this._service.registerUserRemote(this.user).subscribe(
  data =>{
    console.log("response received");
    this._router.navigate(['/clientLogin'])
  },
  error =>{
    console.log("exception occured");
    this.msg=error.error;
  }
)
  }
}
