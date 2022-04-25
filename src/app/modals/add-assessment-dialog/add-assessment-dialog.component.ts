import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {QuizService} from "../../services/quiz.service";
import {AssessmentService} from "../../services/assessment.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-assessment-dialog',
  templateUrl: './add-assessment-dialog.component.html',
  styleUrls: ['./add-assessment-dialog.component.css']
})
export class AddAssessmentDialogComponent implements OnInit {


  assessmentForm !: FormGroup;
  actionBtn: string = "Save"

  constructor(private formBuilder: FormBuilder,private assessmentService: AssessmentService,
              @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<AddAssessmentDialogComponent>) {
  }

  ngOnInit(): void {
    this.assessmentForm = this.formBuilder.group({
      title: ['', Validators.required],
      expirationDate: ['', Validators.required],


    });
    if (this.editData) {
      this.actionBtn = 'Update'
      this.assessmentForm.controls['title'].setValue(this.editData.title)
      this.assessmentForm.controls['expirationDate'].setValue(this.editData.expirationDate)

    }
  }

  addAssessment() {
    if (!this.editData) {
      if (this.assessmentForm.valid) {
        this.assessmentService.addAssessmentService(this.assessmentForm.value).subscribe({
          next: (res) => {
            alert("Assessment added successfully");
            this.assessmentForm.reset();
            this.dialogRef.close("Save");
          },
          error: () => {
            alert("Error while adding the Assessment")
          }
        })
      }
    }
    else {
      this.updateAssessment()
    }
  }


  updateAssessment()
  {

    this.assessmentService.updateAssessmentService(this.editData.id, this.assessmentForm.value ).subscribe({
      next: (res) => {
        alert("Assessment Updated Successfully");
        this.assessmentForm.reset();
        this.dialogRef.close("Update");
      },
      error: () => {
        alert("Error while updating record");

      }
    })
  }

}
