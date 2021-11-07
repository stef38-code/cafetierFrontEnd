import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Ticket} from "../../../shared/state/model/ticket";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {ApplicationStore} from "../../../shared/state/reducers";
import {CollectionTicketSelector} from "../../../shared/state/selectors/collection-tickets";
import {CollectionTicketAction} from "../../../shared/state/actions/collection-tickets-action";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {TicketAction} from "../../../shared/state/actions/ticket-action";
import {DialogueTicketComponent} from "../../dialogue/dialogue-ticket/dialogue-ticket.component";
import {HttpClient} from "@angular/common/http";
import {TicketHttpService} from "../../../shared/services/ticket-http.service";
import {Lien} from "../../../shared/state/model/lien";

@Component({
  selector: 'app-table-tickets',
  templateUrl: './table-tickets.component.html',
  styleUrls: ['./table-tickets.component.css']
})
export class TableTicketsComponent implements OnInit {


  /*displayedColumns: string[] = ['select', 'numero', 'montant', 'nom', 'prenom', 'action'];*/
  //displayedColumns: string[] = [ 'numero', 'montant', 'nom', 'prenom', 'action'];
  dataSource: MatTableDataSource<Ticket> = new MatTableDataSource();
  selection = new SelectionModel<Ticket>(true, []);
  allowMultiSelect: boolean = true;

  @Input() displayedColumns: string[] = ['numero', 'montant', 'nom', 'prenom', 'action'];

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  private ticketEntitiesStore$: Observable<Ticket[]>;
  links: Lien[] = {} as Lien[];
  private httpTicket: TicketHttpService;

  constructor(private store: Store<ApplicationStore.State>,
              private dialog: MatDialog,
              private http$: HttpClient,
              private changeDetectorRefs: ChangeDetectorRef) {
    this.ticketEntitiesStore$ = store.select(CollectionTicketSelector.getTicketEntites);
    //
    this.ticketEntitiesStore$.subscribe(
      res => {
        console.log("Chargement des tickets-----", res);
        this.dataSource.data = res ? res : [];
      }
    );
    //this.selection = new SelectionModel<Ticket>(this.allowMultiSelect, this.dataSource.data, false);
    //this.translate();
    this.httpTicket = new TicketHttpService(this.http$);
  }

  ngOnInit() {
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

  openDialog(update: string, ticket: Ticket) {


  }

  isAffecte(row: Ticket): boolean {
    if (row.personne && row.personne.nom && row.personne.prenom) {
      return true;
    }
    return false;
  }

  editDialog(row: Ticket) {
    const dialogConfig = new MatDialogConfig<Ticket>();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    //dialogConfig.data = row;
    this.store.dispatch(new TicketAction.Load(row));
    const dialogRef = this.dialog.open(DialogueTicketComponent,
      dialogConfig);


    dialogRef.afterClosed().subscribe(
      val => console.log("Dialog output:", val)
    );
  }

  private translate() {
    this.paginator._intl.itemsPerPageLabel = 'Items par page';
    this.paginator._intl.nextPageLabel = 'Page suivante';
    this.paginator._intl.previousPageLabel = 'Page précédente';
    this.paginator._intl.firstPageLabel = 'Première page';
    this.paginator._intl.lastPageLabel = 'Dernière page';
  }

  liberer(row: Ticket) {
    let links: Lien[] = row.links;
    const linkLiberer: Lien | undefined = links.find(link => (link.rel === 'liberer' && link.type === 'DELETE' && link.href.length !== 0));
    if (linkLiberer) {
      this.httpTicket!.liberer(linkLiberer.href).unsubscribe();
      this.store.dispatch(new CollectionTicketAction.Load());
      this.changeDetectorRefs.detectChanges();
    }
  }
}
