import {Component, Inject, OnInit} from '@angular/core';
import {AddQuizDialogComponent} from "../../modals/add-quiz-dialog/add-quiz-dialog.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {

  constructor(private dialog:MatDialog) {

  }

  ngOnInit(): void {

  }
  openDialog() {
    this.dialog.open(AddQuizDialogComponent, {
  width:'30%'
    });
  }

}
