import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {QuizService} from "../../services/quiz.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-quiz-dialog',
  templateUrl: './add-quiz-dialog.component.html',
  styleUrls: ['./add-quiz-dialog.component.css']
})
export class AddQuizDialogComponent implements OnInit {
  publicationState = [true, false];
  quizForm !: FormGroup;
  actionBtn: string = "Save"

  constructor(private formBuilder: FormBuilder, private quizService: QuizService,
              @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<AddQuizDialogComponent>) {
  }

  ngOnInit(): void {
    this.quizForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      level: ['', Validators.required],
      creationDate: ['', Validators.required],
      isPublished: ['', Validators.required],

    });
    if (this.editData) {
      this.actionBtn = 'Update'
      this.quizForm.controls['title'].setValue(this.editData.title)
      this.quizForm.controls['description'].setValue(this.editData.description)
      this.quizForm.controls['level'].setValue(this.editData.level)
      this.quizForm.controls['creationDate'].setValue(this.editData.creationDate)
      this.quizForm.controls['isPublished'].setValue(this.editData.isPublished)
    }
  }

  addQuiz() {
    //console.log(this.quizForm.value)
    if (!this.editData) {
      if (this.quizForm.valid) {
        this.quizService.addQuizService(this.quizForm.value).subscribe({
          next: (res) => {
            alert("quiz added successfully");
            this.quizForm.reset();
            this.dialogRef.close("Save");
          },
          error: () => {
            alert("Error while adding the quiz")
          }
        })
      }
    }
    else {
      this.updateQuiz()
    }
  }
  updateQuiz()
    {

      this.quizService.updateQuizService(this.editData.id, this.quizForm.value ).subscribe({
        next: (res) => {
          alert("quiz Updated Successfully");
          this.quizForm.reset();
          this.dialogRef.close("Update");
        },
        error: () => {
          alert("Error while updating record");

        }
      })
    }
  }
