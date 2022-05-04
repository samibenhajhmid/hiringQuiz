import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {QuizService} from "../../../shared/services/quiz.service";
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import { Subject, takeUntil} from "rxjs";
import {ConfirmDeleteComponent} from "../../../modals/confirm-delete/confirm-delete.component";
import {Router} from "@angular/router";
import {AddQuizDialogComponent} from "../../../modals/add-quiz-dialog/add-quiz-dialog.component";


@Component({
  selector: 'app-quizzes-list',
  templateUrl: './quizzes-list.component.html',
  styleUrls: ['./quizzes-list.component.css']
})
export class QuizzesListComponent implements OnInit, OnDestroy {
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  constructor(private _http: HttpClient, private dialog: MatDialog,
              private quizService: QuizService, private _route: Router) {}
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'title', 'description', 'level', 'relatedAssessment' ,'creationDate', 'actions'];

  @ViewChild(MatSort) sort: MatSort ;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  display = false;
  searchKey: string;

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }


  ngOnInit() {
    this.getAllQuizzes();
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
        this.quizService.removeQuizById(id).then(() => this.getAllQuizzes());
      }
    });
  }

  openDialog() {
    this.dialog.open(AddQuizDialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(value => {
      if (value==='Save'){
        this.getAllQuizzes();
      }
    })
  }


  getAllQuizzes(){
    this.quizService.getAllQuizzesService().subscribe({
      next:(res)=>{

        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error:()=>{
        alert("Error while fetching the Records!");
      }
    })
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  editQuiz(element:any){
    this.dialog.open(AddQuizDialogComponent,{
      width:'30%',
      data:element
    }).afterClosed().subscribe(value => {
      if (value==='Update'){
        this.getAllQuizzes();
      }
    })
  }
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();

  }

}

