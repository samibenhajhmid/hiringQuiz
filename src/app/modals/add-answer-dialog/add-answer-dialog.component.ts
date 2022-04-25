import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {QuestionService} from "../../services/question.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {QuizService} from "../../services/quiz.service";
import {AnswerService} from "../../services/answer.service";
import {Question} from "../../interfaces/question";



@Component({
  selector: 'app-add-answer-dialog',
  templateUrl: './add-answer-dialog.component.html',
  styleUrls: ['./add-answer-dialog.component.css']
})
export class AddAnswerDialogComponent implements OnInit {
  answerForm: FormGroup;
  correctState= [true, false];

  constructor( private answerService: AnswerService,
               @Inject(MAT_DIALOG_DATA) public editData: any,
               private dialogRef: MatDialogRef<AddAnswerDialogComponent>) {}


  ngOnInit() {
    this.answerForm = new FormGroup({
      answer: new FormArray([
        new FormGroup({
          description: new FormControl(''),
          isCorrect: new FormControl(''),
          relatedQuestion: new FormControl(''),

        })
      ])
    });

  }

  get answer(): FormArray {
    return this.answerForm.get('answer') as FormArray;
  }

  addAnswer() {
    this.answer.push(
      new FormGroup({
        description: new FormControl(''),
        isCorrect: new FormControl(''),
        relatedQuestion: new FormControl(''),

      })
    );
  }

  saveAnswers() {

    for (let i=0; i<this.answer.length; i++)
    {
      this.answer.value[i].relatedQuestion =this.editData.questionText
      this.answerService.addAnswerService(this.answer.value[i]).subscribe({
        next: (res)=>{
          alert("Answers added successfully")
          console.log(this.editData.questionText)
          console.log(this.answer.value)

        },
        error: () => {
          alert("Error while adding the answers")
          console.log(this.editData.questionText)
          console.log(this.answer.value)

        }
      })
    }
  }
}
