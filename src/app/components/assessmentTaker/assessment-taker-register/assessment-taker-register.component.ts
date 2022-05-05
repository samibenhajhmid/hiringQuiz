import { Component, OnInit } from '@angular/core';
import {User} from "../../../shared/models/user";
import {UserService} from "../../../shared/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-assessment-taker-register',
  templateUrl: './assessment-taker-register.component.html',
  styleUrls: ['./assessment-taker-register.component.css']
})
export class AssessmentTakerRegisterComponent implements OnInit {
  msg= '';
  user = new User();

  constructor(private _service: UserService, private _router : Router) { }

  ngOnInit(): void {
  }

  registerCandidate() {
    this.user.role='CANDIDATE';
    this._service.registerCandidateRemote(this.user).subscribe(
      data =>{
        console.log("response received");
        this._router.navigate(['/assessmentTakerLogin'])
      },
      error =>{
        console.log("exception occured");
        this.msg=error.error;
      }
    )
  }
}
