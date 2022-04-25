import {Component, OnInit, ViewChild} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {QuizService} from "../../../services/quiz.service";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ConfirmDeleteComponent} from "../../../modals/confirm-delete/confirm-delete.component";
import {AddQuizDialogComponent} from "../../../modals/add-quiz-dialog/add-quiz-dialog.component";
import {AssessmentService} from "../../../services/assessment.service";
import {AddAssessmentDialogComponent} from "../../../modals/add-assessment-dialog/add-assessment-dialog.component";

@Component({
  selector: 'app-assessments-list',
  templateUrl: './assessments-list.component.html',
  styleUrls: ['./assessments-list.component.css']
})
export class AssessmentsListComponent implements OnInit {
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  constructor(private _http: HttpClient, private dialog: MatDialog,
              private assessmentService: AssessmentService, private _route: Router) {}

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'title', 'expirationDate', 'assessmentCode', 'actions'];

  @ViewChild(MatSort) sort: MatSort ;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  display = false;
  searchKey: string;

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }


  ngOnInit() {
    this.getAllAssessments();
  }


  onRemoveAssessment(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      hasBackdrop: true,
      disableClose: false,
    });
    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.assessmentService.removeAssessmentById(id).then(() => this.getAllAssessments());
      }
    });
  }

  openDialog() {
    this.dialog.open(AddAssessmentDialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(value => {
      if (value==='Save'){
        this.getAllAssessments();
      }
    })
  }


  getAllAssessments(){
    this.assessmentService.getAllAssessmentsService().subscribe({
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
  editAssessment(element:any){
    this.dialog.open(AddAssessmentDialogComponent,{
      width:'30%',
      data:element
    }).afterClosed().subscribe(value => {
      if (value==='Update'){
        this.getAllAssessments();
      }
    })
  }
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();

  }

  getAssessmentById(id: any) {
    this.assessmentService.getAssessmentByIdService(id).subscribe(data =>{
      console.log("assessment By id Received")
    })
  }


}


