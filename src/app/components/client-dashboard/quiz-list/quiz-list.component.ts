import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {QuizService} from "../../../services/quiz.service";
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {HttpClient} from "@angular/common/http";
import {Quiz} from "../../../interfaces/quiz";
import {MatDialog, MAT_DIALOG_DATA,MatDialogConfig} from "@angular/material/dialog";
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
  //quizs: Quiz[] = [];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'title', 'description', 'level', 'creationDate', 'isPublished', 'actions'];
  //quiz = new Quiz();

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
   this.quizService.getQuizsService().subscribe({
     next:(res)=>{
       this.dataSource = new MatTableDataSource(res);
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
     },
     error:(err)=>{
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

   getQuizsById(id: any) {
    this.quizService.getQuizsByIdService(id).subscribe(data =>{
      console.log("quizs By id Received")
      this._route.navigate(['/clientDashboard/questions'], {state:{data: id}})
    })
  }
}

