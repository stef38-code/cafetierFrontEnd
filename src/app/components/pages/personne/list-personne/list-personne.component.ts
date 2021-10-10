import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from "@angular/material/sort";
import {SelectionModel} from "@angular/cdk/collections";
import {HttpClient} from "@angular/common/http";
import {Personne} from "../../../../model/personne";
import {merge} from "rxjs";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {HttpPersonne} from "../../../../shared/backend/http-personne";
// @ts-ignore


@Component({
  selector: 'app-list-personne',
  templateUrl: './list-personne.component.html',
  styleUrls: ['./list-personne.component.css']
})
export class ListPersonneComponent implements AfterViewInit {
  displayedColumns: string[] = ['select','numero','nom', 'prenom', 'nombreTicket','action'];
  dataSource: MatTableDataSource<Personne> = new MatTableDataSource();
   selection = new SelectionModel<Personne>(true, []);
   allowMultiSelect : boolean = true;
  private httpPersonne: HttpPersonne;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private http: HttpClient) {
    this.httpPersonne = new HttpPersonne(this.http);
   /* merge<Personne>()
      .pipe(
        this.getStartWith(),
        this.getSwitchMap(),
        this.getMap(),
        this.getCatchError()
      ).subscribe(data => this.dataSource.data = data);
*/
    this.httpPersonne!.getListPersonne().subscribe((response: any) => {
      this.dataSource.data = response;
    });
    this.selection = new SelectionModel<Personne>(this.allowMultiSelect,this.dataSource.data, false);
  }
/*
  private getCatchError():observableOf<Personne> {
    return catchError(() => {
      /!*          this.isLoadingResults = false;
                // Catch if the GitHub API has reached its rate limit. Return empty data.
                this.isRateLimitReached = true;*!/

      return observableOf<Personne>([]);
    });
  }*/

  /*private getMap() {
    return map(data => {
      // Flip flag to show that loading has finished.
      /!* this.isLoadingResults = false;
       this.isRateLimitReached = false;
       this.resultsLength = data.total_count;*!/

      return data;
    });
  }*/

  /*private getStartWith() {
    return startWith({});
  }

  private getSwitchMap() {
    return switchMap(() => {
      /!*this.isLoadingResults = true;*!/
      return this.httpPersonne!.getListPersonne();
    });
  }*/

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  openDialog(update: string, personne: Personne ) {

  }
}

