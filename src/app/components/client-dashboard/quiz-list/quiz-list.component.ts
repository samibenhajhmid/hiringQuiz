import {Component, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {QuizService} from "../../../services/quiz.service";
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {HttpClient} from "@angular/common/http";
import {Quiz} from "../../../interfaces/quiz";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddQuizComponent} from "../../../modals/add-quiz/add-quiz.component";

import {Observable, Subject, takeUntil} from "rxjs";
import {ConfirmDeleteComponent} from "../../../modals/confirm-delete/confirm-delete.component";
import {Router} from "@angular/router";
import {AddQuizDialogComponent} from "../../../modals/add-quiz-dialog/add-quiz-dialog.component";


@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit, OnDestroy {
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  constructor(private _http: HttpClient, private dialog: MatDialog,
              private quizService: QuizService, private _route: Router) {}
  quizs: Quiz[] = [];
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'title', 'description', 'level', 'creationDate', 'isPublished', 'actions'];
  quiz = new Quiz();

  @ViewChild(MatSort) sort: MatSort ;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  display = false;
  searchKey: string;

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }


  ngOnInit() {
    this.getQuizs();
  }


  onRemoveQuiz(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      hasBackdrop: true,
      disableClose: false,
    });
    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.quizService.removeQuizById(id).then(() => this.getQuizs());
      }
    });
  }


  getQuizs() {
    this.quizService.getQuizsService().subscribe(
      response => {
        console.log(response);
        this.quizs = response;
        this.listData = new MatTableDataSource(response);
        console.log(this.listData)
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator
      }

    );
    this.listData.filterPredicate = (data, filter) => {
      return this.displayedColumns.some(ele => {
        return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
      });
    };
  }
/*
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(AddQuizComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


*/
  openDialog() {
    this.dialog.open(AddQuizDialogComponent, {
    width: '30%'
    });
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();

  }

   getQuizsById(id: any) {
    this.quizService.getQuizsByIdService(id).subscribe(data =>{
      console.log("quizs By id Received")
      console.log("______________________")
      this._route.navigate(['/clientDashboard/edit-quiz'], {state:{data: id}})
    })
  }
}

