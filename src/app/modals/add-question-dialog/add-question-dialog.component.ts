import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {QuizService} from "../../shared/services/quiz.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {QuestionService} from "../../shared/services/question.service";


@Component({
  selector: 'app-add-question-dialog',
  templateUrl: './add-question-dialog.component.html',
  styleUrls: ['./add-question-dialog.component.css']
})
export class AddQuestionDialogComponent implements OnInit {
  questionForm !: FormGroup;
  actionBtn: string = "Save"
  questionQuizState= [];

  constructor(private formBuilder: FormBuilder, private questionService: QuestionService,
              @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<AddQuestionDialogComponent>,
             private quizService: QuizService) {}

  ngOnInit(): void {
    this.questionForm = this.formBuilder.group({
      questionText: ['', Validators.required],
      category: ['', Validators.required],
      relatedQuiz: ['', Validators.required],
      questionTime: ['', Validators.required],
      questionScore: ['', Validators.required],

    });
    if (this.editData) {
      this.actionBtn = 'Update'
      this.questionForm.controls['questionText'].setValue(this.editData.questionText)
      this.questionForm.controls['category'].setValue(this.editData.category)
      this.questionForm.controls['relatedQuiz'].setValue(this.editData.relatedQuiz)
      this.questionForm.controls['questionTime'].setValue(this.editData.questionTime)
      this.questionForm.controls['questionScore'].setValue(this.editData.questionScore)
    }
    this.getRelatedQuiz()
  }

  addQuestion() {

    if (!this.editData) {
      if (this.questionForm.valid) {
        this.questionService.addQuestionService(this.questionForm.value).subscribe({
          next: () => {
            console.log(this.questionForm.value)
            alert("question added successfully");
            console.log(this.questionForm.value)
            this.questionForm.reset();
            this.dialogRef.close("Save");
          },
          error: () => {
            alert("Error while adding the question")
          }
        })
      }
    }
    else {
      this.updateQuestion()
    }
  }


  updateQuestion()
  {

    this.questionService.updateQuestionService(this.editData.id, this.questionForm.value ).subscribe({
      next: () => {
        alert("question Updated Successfully");
        this.questionForm.reset();
        this.dialogRef.close("Update");
      },
      error: () => {
        alert("Error while updating record");

      }
    })
  }
  getRelatedQuiz(){
    this.quizService.getAllQuizzesService().subscribe({
      next: (res) =>{
        for(let element of res){
          this.questionQuizState.push(element.title)
        }

    }
    })
  }
}
