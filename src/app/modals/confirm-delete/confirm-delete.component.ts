import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {MatDialogModule} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent {
  public title = 'Are you sure?';
  public message = 'Do you really want to remove this item?';
  public confirmButtonLabel = 'Confirm';
  public confirmButtonColor = 'accent';
  public cancelButtonLabel = 'Cancel';

  /**
   * Constructor
   *
   * @param {MatDialogRef<ConfirmDeleteComponent>} dialogRef
   */
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteComponent>
  ) {
  }

}

