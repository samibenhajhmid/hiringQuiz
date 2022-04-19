import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {QuizService} from "../../../services/quiz.service";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {Quiz} from "../../../interfaces/quiz";
import {QuestionService} from "../../../services/question.service";
import {Question} from "../../../interfaces/question";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ConfirmDeleteComponent} from "../../../modals/confirm-delete/confirm-delete.component";
import {AddQuizDialogComponent} from "../../../modals/add-quiz-dialog/add-quiz-dialog.component";
import {AddQuestionDialogComponent} from "../../../modals/add-question-dialog/add-question-dialog.component";
import {listenToTriggers} from "@ng-bootstrap/ng-bootstrap/util/triggers";

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
  displayedColumns: string[] = ['id', 'questionText', 'category', 'questionQuiz', 'questionTime', 'questionScore', 'actions'];
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

  /*getQuestionsByQuizId(id: any) {
    this.questionService.getQuestionsByQuizIdService(history.state.data).subscribe(
      response => {
        console.log(response);
        this.questions = response;
        this.dataSource = new MatTableDataSource(response);
        console.log(this.dataSource)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator
      }
    );
    this.dataSource.filterPredicate = (data, filter) => {
      return this.displayedColumns.some(ele => {
        return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
      });
    };
  }

*/
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


 getAllQuestions() {
   this.questionService.getAllQuestionsService().subscribe({
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
}
