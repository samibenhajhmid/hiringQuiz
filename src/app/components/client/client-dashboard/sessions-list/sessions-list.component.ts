import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ConfirmDeleteComponent} from "../../../../modals/confirm-delete/confirm-delete.component";
import {SessionService} from "../../../../shared/services/session.service";

@Component({
  selector: 'app-sessions-list',
  templateUrl: './sessions-list.component.html',
  styleUrls: ['./sessions-list.component.css']
})
export class SessionsListComponent implements OnInit, OnDestroy {

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  constructor(private _http: HttpClient, private dialog: MatDialog,
              private sessionService: SessionService, private _route: Router) {}

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'creationDate', 'relatedUser', 'relatedQuiz', 'relatedAssessment','sessionNote', 'passedTime' , 'actions'];

  @ViewChild(MatSort) sort: MatSort ;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  display = false;
  searchKey: string;

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }


  ngOnInit() {
    this.getAllSessions();
  }


  onRemoveSession(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      hasBackdrop: true,
      disableClose: false,
    });
    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.sessionService.removeSessionById(id).then(() => this.getAllSessions());
      }
    });
  }



  getAllSessions(){
    this.sessionService.getAllSessionsService().subscribe({
      next:(res)=>{
  console.log("hello")
        console.log(res)
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

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();

  }

}

