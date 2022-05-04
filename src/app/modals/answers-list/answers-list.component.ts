import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {ConfirmDeleteComponent} from "../confirm-delete/confirm-delete.component";
import {AddQuestionDialogComponent} from "../add-question-dialog/add-question-dialog.component";
import {AnswerService} from "../../shared/services/answer.service";
import {AddAnswerDialogComponent} from "../add-answer-dialog/add-answer-dialog.component";
import {emitDistinctChangesOnlyDefaultValue} from "@angular/compiler";

@Component({
  selector: 'app-answers-list',
  templateUrl: './answers-list.component.html',
  styleUrls: ['./answers-list.component.css']
})
export class AnswersListComponent implements OnInit, OnDestroy {
  /** Subject that emits when the component has been destroyed. */
protected _onDestroy = new Subject<void>();

  constructor(private _http: HttpClient, private dialog: MatDialog, private answerService: AnswerService,
              @Inject(MAT_DIALOG_DATA) public questionData: any) {
  }


  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'description', 'espace' ,'isCorrect', 'actions'];

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngOnInit(): void {
    this.getAnswersByQuestion();
    console.log(this.questionData)
    this.answerService.relatedQuestion=this.questionData.questionText

  }


  onRemoveAnswer(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      hasBackdrop: true,
      disableClose: false,
    });
    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.answerService.removeAnswerById(id).then(() => this.getAnswersByQuestion());
      }
    });
  }



  editAnswer(element:any){
    this.dialog.open(AddAnswerDialogComponent,{
      width:'25%',
      data:element
    }).afterClosed().subscribe(value => {
      if (value==='Update'){
        this.getAnswersByQuestion();
      }
    })
  }


/*
  OpenAnswerDialog(element: any) {
    const dialogRef = this.dialog.open(AnswersListComponent, {
      hasBackdrop: true,
      disableClose: false,
      width: '100%',
      height : 'auto'
    });

  }

 */
 getAnswersByQuestion() {
   this.answerService.getAnswersByQuestionId(this.questionData.id).subscribe({
     next:(res)=>{
       this.dataSource = new MatTableDataSource(res);
       console.log(this.dataSource.data)
     },
     error:()=>{
       alert("Error while fetching the Records!");
     }
   })
 }

  addAnswer() {
      this.dialog.open(AddAnswerDialogComponent,{
        width:'30%',

      }).afterClosed().subscribe(value => {
          this.getAnswersByQuestion();
      })
    }

}
