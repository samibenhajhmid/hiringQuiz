import { Component, OnInit } from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {Router} from "@angular/router";

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
      () => {console.log("response recieved");
        console.log(this.candidateLoginObject);

        this.route.navigate(['/assessment',this.candidateLoginObject.assessmentCode] ,{state: {assessmentCode: this.candidateLoginObject.assessmentCode,
          userEmail:this.candidateLoginObject.email}});
      },
      () => {console.log("Exception occured");
        this.msg = 'Bad Credentials , please enter valid email and password'
      })
  }
}
