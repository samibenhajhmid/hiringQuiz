import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Subject, takeUntil} from "rxjs";
import {QuestionService} from "../../../services/question.service";
import {Quiz} from "../../../interfaces/quiz";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {Question} from "../../../interfaces/question";
import {ConfirmDeleteComponent} from "../../../modals/confirm-delete/confirm-delete.component";
import {AddQuizComponent} from "../../../modals/add-quiz/add-quiz.component";
import {QuizService} from "../../../services/quiz.service";
@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.css']
})
export class EditQuizComponent implements OnInit, OnDestroy {
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  constructor(private _http: HttpClient, private dialog: MatDialog, private quizService: QuizService ,private questionService: QuestionService) {
  }
  questions: Question[] = [];
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'description', 'category', 'question_time', 'question_score', 'actions'];
  @ViewChild(MatSort) sort: MatSort ;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  display = false;
  searchKey: string;

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  ngOnInit() {
    this.getQuestionsByQuiz(history.state.data)


  }


  getQuestionsByQuiz(id :any) {
    this.questionService.getQuestionsByQuizService(history.state.data).subscribe(
      response => {
        console.log(response);
        this.questions = response;
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

  onRemoveQuestion(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      hasBackdrop: true,
      disableClose: false,
    });
    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.questionService.removeQuestionById(id).then(() => this.getQuestionsByQuiz(id));
      }
    });
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();

  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(AddQuizComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
