import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ConfirmDeleteComponent} from "../../../../modals/confirm-delete/confirm-delete.component";

import {AddCandidateDialogComponent} from "../../../../modals/add-candidate-dialog/add-candidate-dialog.component";
import {UserService} from "../../../../shared/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.css']
})
export class CandidatesListComponent implements OnInit, OnDestroy {

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  constructor(private _http: HttpClient, private dialog: MatDialog,
              private userService: UserService, private _route: Router) {}

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'username', 'email', 'password', 'actions'];


  @ViewChild(MatSort) sort: MatSort ;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  display = false;
  searchKey: string;

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }


  ngOnInit() {
    this.getAllCandidates();
  }


  onRemoveCandidate(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      hasBackdrop: true,
      disableClose: false,
    });
    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.userService.removeUserByIdService(id).then(() => this.getAllCandidates());
      }
    });
  }

  openDialog() {
    this.dialog.open(AddCandidateDialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(value => {
      if (value==='Save'){
        this.getAllCandidates();
      }
    })
  }


  getAllCandidates(){
    this.userService.getAllCandidatesService().subscribe({
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
  editCandidate(element:any){
    this.dialog.open(AddCandidateDialogComponent,{
      width:'30%',
      data:element
    }).afterClosed().subscribe(value => {
      if (value==='Update'){
        this.getAllCandidates();
      }
    })
  }
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();

  }

}

