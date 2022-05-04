import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {QuestionService} from "../../../shared/services/question.service";
import {Question} from "../../../shared/models/question";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ConfirmDeleteComponent} from "../../../modals/confirm-delete/confirm-delete.component";
import {AddQuestionDialogComponent} from "../../../modals/add-question-dialog/add-question-dialog.component";
import {AddAnswerDialogComponent} from "../../../modals/add-answer-dialog/add-answer-dialog.component";
import {AnswersListComponent} from "../../../modals/answers-list/answers-list.component";

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit, OnDestroy {
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  constructor(private _http: HttpClient, private dialog: MatDialog,
              private questionService: QuestionService, private _route: Router) {
  }


  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'questionText', 'category', 'relatedQuiz', 'questionTime', 'questionScore', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  display = false;
  searchKey: string;
  questions: Question[] = [];
  question= new Question();

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngOnInit(): void {
    this.getAllQuestions();
  }


  onRemoveQuestion(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      hasBackdrop: true,
      disableClose: false,
    });
    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.questionService.removeQuestionById(id).then(() => this.getAllQuestions());
      }
    });
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();

  }

  openDialog() {
    this.dialog.open(AddQuestionDialogComponent, {
      width: '25%',
    }).afterClosed().subscribe(value => {
      if (value==='Save'){
        this.getAllQuestions()
      }
    })
  }

  getAllQuestions(){
    this.questionService.getAllQuestionsService().subscribe({
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

  editQuestion(element:any){
    this.dialog.open(AddQuestionDialogComponent,{
      width:'25%',
      data:element
    }).afterClosed().subscribe(value => {
      if (value==='Update'){
        this.getAllQuestions();
      }
    })
  }



  OpenAnswerDialog(element: any) {
    const dialogRef = this.dialog.open(AnswersListComponent, {
      hasBackdrop: true,
      disableClose: false,
      data:element
    });

  }

}
