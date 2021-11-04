import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Ticket} from "../../../../../shared/state/model/ticket";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Store} from "@ngrx/store";
import {ApplicationStore} from "../../../../../shared/state/reducers";
import {PersonneSelector} from "../../../../../shared/state/selectors/personne";
import {Observable} from "rxjs";
import {Personne} from "../../../../../shared/state/model/personne";

@Component({
  selector: 'app-tickets-affectes',
  templateUrl: './tickets-affectes.component.html',
  styleUrls: ['./tickets-affectes.component.css']
})
export class TicketsAffectesComponent implements OnInit {

  dataSource: MatTableDataSource<Ticket> = new MatTableDataSource();
  selection = new SelectionModel<Ticket>(true, []);
  allowMultiSelect: boolean = true;

  @Input() displayedColumns: string[] = ['numero', 'montant', 'action'];

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  idPersonne: string = '';
  personne$: Observable<Personne>;

  constructor(private store: Store<ApplicationStore.State>) {
    this.personne$ = store.select(PersonneSelector.getPersonneSelected);
    this.personne$.subscribe(res => {
      this.dataSource.data = res.tickets ? res.tickets : [];
      this.idPersonne = res.id;
    });
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.selection.clear();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  liberer(row: Ticket) {

  }
}
