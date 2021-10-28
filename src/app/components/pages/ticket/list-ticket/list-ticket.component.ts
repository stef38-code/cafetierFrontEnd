import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {HttpTicket} from "../../../../shared/backend/http-ticket";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {HttpClient} from "@angular/common/http";
import {Ticket} from "../../../../shared/state/model/ticket";
import {Observable} from "rxjs";
import {Personne} from "../../../../shared/state/model/personne";
import {Store} from "@ngrx/store";
import {ApplicationStore} from "../../../../shared/state/reducers";
import {PersonneSelector} from "../../../../shared/state/selectors/personne";
import {PersonneAction} from "../../../../shared/state/actions/personne-action";
import {TicketAction} from "../../../../shared/state/actions/ticket-action";
import {TicketSelector} from "../../../../shared/state/selectors/ticket";

@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.css']
})
export class ListTicketComponent implements OnInit {

  displayedColumns: string[] = ['select','numero','montant','nom','prenom','action'];
  dataSource: MatTableDataSource<Ticket> = new MatTableDataSource();
  selection = new SelectionModel<Ticket>(true, []);
  allowMultiSelect : boolean = true;


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  private ticketEntitiesStore$: Observable<Ticket[]>;

  constructor(private store: Store<ApplicationStore.State>) {
    this.ticketEntitiesStore$= store.select(TicketSelector.getTicketEntites);
    //
    this.ticketEntitiesStore$.subscribe(res => this.dataSource.data = res);
    this.selection = new SelectionModel<Ticket>(this.allowMultiSelect,this.dataSource.data, false);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.store.dispatch(new TicketAction.Load());
    this.selection.clear();
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

  openDialog(update: string, ticket: Ticket ) {


  }

}
