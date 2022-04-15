import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormControl} from "@angular/forms";

import {Quiz} from "../../interfaces/quiz";
import {QuizService} from "../../services/quiz.service";
import {Observable} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  quizs: Observable<Quiz[]>;
  floatLabelControl = new FormControl('false');
  msg= '';
  quiz = new Quiz();
  selectedLevel: any;
  private dataSource: MatTableDataSource<any[]>;

  constructor(public _service: QuizService){}

  ngOnInit() {
  }

  addQuiz() {
    this.quiz.creationDate = new Date();
    this.quiz.modificationDate = new Date();
   console.log(this.quiz)
      this._service.addQuizService(this.quiz).subscribe(
        data =>{
          console.log("response received");
          this._service.getQuizsService().subscribe(data =>{
            console.log("table updated")
          })

        },
        error =>{
          console.log("exception occured");
          this.msg=error.error;
        }
      )
    }

}
