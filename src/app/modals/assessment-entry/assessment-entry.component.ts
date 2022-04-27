import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import Swal from "sweetalert2";

@Component({
  selector: 'app-assessment-entry',
  templateUrl: './assessment-entry.component.html',
  styleUrls: ['./assessment-entry.component.css']
})
export class AssessmentEntryComponent implements OnInit {


  constructor(private route:Router,  @Inject(MAT_DIALOG_DATA) public quizData: any ) {
  }

  ngOnInit(): void {
    console.log(this.quizData)
  }

  startQuiz(){
    Swal.fire({
      title: 'Do you want to start the quiz?',

      showCancelButton: true,
      confirmButtonText: `Start`,

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.route.navigate(['/start-quiz',this.quizData.id]);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
}
