import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AnswerService} from "../../shared/services/answer.service";
import {AssessmentService} from "../../shared/services/assessment.service";
import {Answer} from "../../shared/models/answer";


@Component({
  selector: 'app-add-answer-dialog',
  templateUrl: './add-answer-dialog.component.html',
  styleUrls: ['./add-answer-dialog.component.css']
})
export class AddAnswerDialogComponent implements OnInit {

  answerForm !: FormGroup;
  actionBtn: string = "Save"
  answer: Answer={
  id: undefined,
  description: undefined,
  isCorrect: undefined,
  relatedQuestion:undefined
};
  correctState=[true,false];

  constructor(private formBuilder: FormBuilder,private answerService: AnswerService,
              @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<AddAnswerDialogComponent>) {
  }

  ngOnInit(): void {
    this.answerForm = this.formBuilder.group({
      description: ['', Validators.required],
      isCorrect: ['', Validators.required],

    });
    if (this.editData) {
      this.actionBtn = 'Update'
      this.answerForm.controls['description'].setValue(this.editData.description)
      this.answerForm.controls['isCorrect'].setValue(this.editData.isCorrect)

    }
  }

  addAnswer() {
    if (!this.editData) {
      this.answer.relatedQuestion=this.answerService.relatedQuestion;
      this.answer.description = this.answerForm.value.description;
      this.answer.isCorrect = this.answerForm.value.isCorrect;
        this.answerService.addAnswerService(this.answer).subscribe({
          next: () => {
            alert("Answer added successfully");
            this.answerForm.reset();
            this.dialogRef.close("Save");
          },
          error: () => {
            alert("Error while adding the Answer")
          }
        })

    }
    else {
      this.updateAnswer()
    }
  }


  updateAnswer()
  {
    this.answer.relatedQuestion=this.answerService.relatedQuestion
    this.answer.description = this.answerForm.value.description
    this.answer.isCorrect = this.answerForm.value.isCorrect
    this.answerService.updateAnswerService(this.editData.id, this.answer).subscribe({
      next: () => {
        alert("Assessment Updated Successfully");
        this.answerForm.reset();
        this.dialogRef.close("Update");
      },
      error: () => {
        alert("Error while updating record");

      }
    })
  }

}
