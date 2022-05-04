import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {QuizService} from "../../shared/services/quiz.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AssessmentService} from "../../shared/services/assessment.service";

@Component({
  selector: 'app-add-quiz-dialog',
  templateUrl: './add-quiz-dialog.component.html',
  styleUrls: ['./add-quiz-dialog.component.css']
})
export class AddQuizDialogComponent implements OnInit {
  publicationState = [true, false];
  quizAssessmentState =[];
  quizForm !: FormGroup;
  actionBtn: string = "Save"

  constructor(private formBuilder: FormBuilder, private quizService: QuizService, private assessmentService: AssessmentService,
              @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<AddQuizDialogComponent>) {
  }

  ngOnInit(): void {
    this.quizForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      level: ['', Validators.required],
      relatedAssessment: ['', Validators.required],
      creationDate: ['', Validators.required],
      isPublished: ['', Validators.required],

    });
    if (this.editData) {
      this.actionBtn = 'Update'
      this.quizForm.controls['title'].setValue(this.editData.title)
      this.quizForm.controls['description'].setValue(this.editData.description)
      this.quizForm.controls['level'].setValue(this.editData.level)
      this.quizForm.controls['relatedAssessment'].setValue(this.editData.relatedAssessment)
      this.quizForm.controls['creationDate'].setValue(this.editData.creationDate)
      this.quizForm.controls['isPublished'].setValue(this.editData.isPublished)
    }
    this.getRelatedAssessment()
  }

  addQuiz() {
    //console.log(this.quizForm.value)
    if (!this.editData) {
      if (this.quizForm.valid) {
        this.quizService.addQuizService(this.quizForm.value).subscribe({
          next: () => {
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
      next: () => {
        alert("quiz Updated Successfully");
        this.quizForm.reset();
        this.dialogRef.close("Update");
      },
      error: () => {
        alert("Error while updating record");

      }
    })
  }

  getRelatedAssessment(){
    this.assessmentService.getAllAssessmentsService().subscribe({
      next: (res) =>{
        for(let element of res){
          this.quizAssessmentState.push(element.title)
        }

      }
    })
  }
}
