import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Ticket} from "../../../../../../shared/state/model/ticket";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {RefPersonne} from "../../../../../../shared/state/model/personne";
import {Lien} from "../../../../../../shared/state/model/lien";
import {PersonneHttpService} from "../../../../../../shared/services/personne-http.service";
import {TicketHttpService} from "../../../../../../shared/services/ticket-http.service";
import {HttpClient} from "@angular/common/http";
import {PersonneEchangeTicketService} from "../../../../../../shared/services/personne-echange-ticket.service";

@Component({
  selector: 'app-tickets-affectes',
  templateUrl: './tickets-affectes.component.html',
  styleUrls: ['./tickets-affectes.component.css']
})
export class TicketsAffectesComponent implements OnInit {

  dataSource: MatTableDataSource<Ticket> = new MatTableDataSource();
  selection = new SelectionModel<Ticket>(true, []);
  allowMultiSelect: boolean = true;

  @Input() displayedColumns: string[] = ['numero', 'montant', 'liberer'];

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  private httpTicket: TicketHttpService;
  private httpPersonne: PersonneHttpService;
  activer: boolean = false;
  private update: boolean = false;
  private refPersonne: RefPersonne = {} as RefPersonne;

  constructor(
    private personneEchangeTicketService$: PersonneEchangeTicketService,
    private http$: HttpClient) {
    this.httpTicket = new TicketHttpService(this.http$)
    this.httpPersonne = new PersonneHttpService(this.http$);
    this.personneEchangeTicketService$.currentUpdateTicketsAffectes.subscribe(update => {
      console.log("Message recu dans table ticket-affectes:", update);
      this.update = update;
      if (update) {
        console.log("Mise à jour des tickets de la personne");
        this.loadTicketNonAfectes();
        this.personneEchangeTicketService$.changeUpdateSource(false);
      }
    });
    this.personneEchangeTicketService$.currentActiverTicketsAffectes.subscribe(activer => {
      console.log("Activer dans table ticket-affectes:", activer);
      this.activer = activer;
    });
    this.personneEchangeTicketService$.currentRefPersonne.subscribe(refPersonne => {
      console.log("Changement des refPersonne:", refPersonne);
      this.refPersonne = refPersonne;
      this.loadTicketNonAfectes();
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
    let links: Lien[] = row.links;
    const linkLiberer: Lien | undefined = links.find(link => (link.rel === 'liberer' && link.type === 'DELETE' && link.href.length !== 0));
    if (linkLiberer) {
      this.httpTicket!.liberer(linkLiberer.href).subscribe(() => {
          this.loadTicketNonAfectes();
          this.personneEchangeTicketService$.changeUpdateTicketsNonAffectes(true);
        }
      );

    }
  }

  private loadTicketNonAfectes() {
    if (this.refPersonne.id) {
      this.httpTicket!.personne(this.refPersonne.id).subscribe(
        (res) => {
          this.dataSource.data = res;
        });
    }
  }
}
