import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../interfaces/user";
import {ActivatedRoute} from "@angular/router";

class CandidateLoginObject {
  id:number;
  email:string;
  password:string;
  assessmentCode:string;
  constructor() {
  }
}

@Component({
  selector: 'app-assessment-taker-login',
  templateUrl: './assessment-taker-login.component.html',
  styleUrls: ['./assessment-taker-login.component.css']
})
export class AssessmentTakerLoginComponent implements OnInit {
  candidateLoginObject  = new CandidateLoginObject();
  msg = '';

  constructor(private userService : UserService, private route: Router ) { }

  ngOnInit(): void {

  }
  candidateLogin(){
    this.userService.candidateLoginService(this.candidateLoginObject).subscribe(
      data => {console.log("response recieved");
        console.log(this.candidateLoginObject);
        this.route.navigate(['/assessment'] ,{state: {data: this.candidateLoginObject.assessmentCode}});
      },
      error => {console.log("Exception occured");
        this.msg = 'Bad Credentials , please enter valid email and password'
      })
  }
}
