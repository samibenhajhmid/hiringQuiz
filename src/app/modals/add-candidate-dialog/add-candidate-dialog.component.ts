import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../shared/services/user.service";


@Component({
  selector: 'app-add-candidate-dialog',
  templateUrl: './add-candidate-dialog.component.html',
  styleUrls: ['./add-candidate-dialog.component.css']
})
export class AddCandidateDialogComponent implements OnInit {

  candidateForm !: FormGroup;
  actionBtn: string = "Save"
  hide = true;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
              @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<AddCandidateDialogComponent>) {
  }

  ngOnInit(): void {
    this.candidateForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: new FormControl('', [Validators.required, Validators.min(8) ]),
      role: ['CANDIDATE'],
    });


    if (this.editData) {
      this.actionBtn = 'Update'
      this.candidateForm.controls['username'].setValue(this.editData.firstName)
      this.candidateForm.controls['email'].setValue(this.editData.email)
      this.candidateForm.controls['password'].setValue(this.editData.password)
      this.candidateForm.controls['role'].setValue(this.editData.role)
    }
  }

  addCandidate() {

    if (!this.editData) {
      if (this.candidateForm.valid) {
        //this.candidateForm = { ...this.candidateForm.value, role: 'CANDIDATE'};
        console.log(this.candidateForm.value)
        this.userService.registerUserRemote(this.candidateForm.value).subscribe({
          next: () => {
            alert("Candidate added successfully");
            this.candidateForm.reset();
            this.dialogRef.close("Save");
          },
          error: () => {
            alert("Error while adding the quiz")
          }
        })
      }
    }
    else {
      this.updateCandidate()
    }
  }


  updateCandidate()
  {

    this.userService.updateUserService(this.editData.id, this.candidateForm.value ).subscribe({
      next: () => {
        alert("quiz Updated Successfully");
        this.candidateForm.reset();
        this.dialogRef.close("Update");
      },
      error: () => {
        alert("Error while updating record");

      }
    })
  }
  get passwordInput() { return this.candidateForm.get('password'); }
}
