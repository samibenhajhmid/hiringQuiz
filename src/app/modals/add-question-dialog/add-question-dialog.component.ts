import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {QuizService} from "../../services/quiz.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {QuestionService} from "../../services/question.service";
import {map} from "rxjs";
import {Quiz} from "../../interfaces/quiz";
import {Question} from "../../interfaces/question";

@Component({
  selector: 'app-add-question-dialog',
  templateUrl: './add-question-dialog.component.html',
  styleUrls: ['./add-question-dialog.component.css']
})
export class AddQuestionDialogComponent implements OnInit {
  questionForm !: FormGroup;
  actionBtn: string = "Save"
  questionQuizState = [];
  listQuizs: Quiz[] = [];
  quiz = new Quiz()
  question = new Question()


  constructor(private formBuilder: FormBuilder, private questionService: QuestionService, private quizService: QuizService,
              @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<AddQuestionDialogComponent>) {
  }

  ngOnInit(): void {
    this.questionForm = this.formBuilder.group({
      questionText: ['', Validators.required],
      category: ['', Validators.required],
      questionQuiz: ['', Validators.required],
      questionTime: ['', Validators.required],
      questionScore: ['', Validators.required],



    });
    if (this.editData) {
      this.actionBtn = 'Update'
      this.questionForm.controls['questionText'].setValue(this.editData.questionText)
      this.questionForm.controls['category'].setValue(this.editData.category)
      this.questionForm.controls['questionQuiz'].setValue(this.editData.questionQuiz)
      this.questionForm.controls['questionTime'].setValue(this.editData.questionTime)
      this.questionForm.controls['questionScore'].setValue(this.editData.questionScore)

    }

    this.getRelatedQuizName()
  }

  getRelatedQuizName() {
    this.quizService.getQuizsService()
      .subscribe({
        next: (res) => {

          this.listQuizs = res
          for (let val of this.listQuizs) {
            this.questionQuizState.push(val.title)
          }
        }
      })
  }

  addQuestion() {
    if (!this.editData) {

      if (this.questionForm.valid) {
       let single_quiz = this.listQuizs.filter( element => element.title ==this.questionForm.controls['questionQuiz'].value)
        console.log(single_quiz)
        this.questionForm.value['quiz']=single_quiz;
       delete this.questionForm.value.questionQuiz;
       console.log(this.questionForm.value)

        //this.questionForm = { ...this.questionForm.value, quiz:this.getQuizByTitle("java")};
        console.log('--------------question body')
        this.questionService.addQuestionService(this.questionForm.value).subscribe({
          next: (res) => {

            alert("question added successfully");
            this.questionForm.reset();
            this.dialogRef.close("Save");
          },
          error: () => {
            alert("Error while adding the question")
          }
        })
      }
    } else {
      this.updateQuestion()
    }
  }

  updateQuestion() {

    this.questionService.updateQuestionService(this.editData.id, this.questionForm.value).subscribe({
      next: (res) => {
        alert("question Updated Successfully");
        this.questionForm.reset();
        this.dialogRef.close("Update");
      },
      error: () => {
        alert("Error while updating record");

      }
    })
  }

  getQuizByTitle(title: any) {
    this.quizService.getQuizByTitleService(title).subscribe({
      next: (res) => {
        console.log("data service received")
        return this.question
      }

    })
  }

}
