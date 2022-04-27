import { Component, OnInit } from '@angular/core';
import {AssessmentService} from "../../services/assessment.service";
import {QuizService} from "../../services/quiz.service";
import {MatDialog} from "@angular/material/dialog";
import {AssessmentEntryComponent} from "../../modals/assessment-entry/assessment-entry.component";

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent implements OnInit {
  data: any;


  constructor(private quizService : QuizService, private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getQuizzesByAssessmentCode();

  }


  filterById(jsonObject, id) {
    return jsonObject.filter(function(jsonObject)
    {return (jsonObject['id'] == id);})[0];
  }

  openDialog(quizId:any) {
    const dialogRef = this.dialog.open(AssessmentEntryComponent, {
      autoFocus:true,
      data: this.filterById(this.data,quizId)

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }



  getQuizzesByAssessmentCode(){
    return this.quizService.getQuizzesByAssessmentCode(history.state.data).subscribe({
      next: (res)=>{
        console.log(res)
       this.data = res;

      },
      error :()=>{
        console.log("Error while getting Quizzes")
      }
    })

}
}
