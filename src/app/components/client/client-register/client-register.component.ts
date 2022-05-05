import { Component, OnInit } from '@angular/core';
import {User} from "../../../shared/models/user";
import {UserService} from "../../../shared/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css']
})
export class ClientRegisterComponent implements OnInit {

  msg= '';
  user = new User();

  constructor(private _service: UserService, private _router : Router) { }

  ngOnInit(): void {
  }

  registerClient() {
    this.user.role ='ADMIN';
    this._service.registerClientRemote(this.user).subscribe(
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

