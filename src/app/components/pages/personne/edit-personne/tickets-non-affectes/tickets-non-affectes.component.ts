import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Ticket} from "../../../../../shared/state/model/ticket";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {HttpClient} from "@angular/common/http";
import {TicketHttpService} from "../../../../../shared/services/ticket-http.service";
import {Lien} from "../../../../../shared/state/model/lien";
import {PersonneHttpService} from "../../../../../shared/services/personne-http.service";
import {PersonneEchangeTicketService} from "../../../../../shared/services/personne-echange-ticket.service";
import {RefPersonne} from "../../../../../shared/state/model/personne";

@Component({
  selector: 'app-tickets-non-affectes',
  templateUrl: './tickets-non-affectes.component.html',
  styleUrls: ['./tickets-non-affectes.component.css']
})
export class TicketsNonAffectesComponent implements OnInit {
  dataSource: MatTableDataSource<Ticket> = new MatTableDataSource();
  selection = new SelectionModel<Ticket>(true, []);
  allowMultiSelect: boolean = true;

  @Input() displayedColumns: string[] = ['numero', 'montant', 'action'];

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  idPersonne: string = '';
  links: Lien[] = {} as Lien[];
  private httpTicket: TicketHttpService;
  private httpPersonne: PersonneHttpService;
  activer: boolean = false;
  private update: boolean = false;
  private refPersonne: RefPersonne = {} as RefPersonne;

  constructor(private personneEchangeTicketService$: PersonneEchangeTicketService,
              private http$: HttpClient) {
    this.httpTicket = new TicketHttpService(this.http$)
    this.httpPersonne = new PersonneHttpService(this.http$)
    this.personneEchangeTicketService$.currentUpdateTicketsNonAffectes.subscribe(update => {
      console.log("Message recu dans ticket non-affectés:", update);
      this.update = update;
      if (update) {
        console.log("@@@@@@@@@@ loadTicketNonAfectes @@@@@@@@@@@@");
        this.loadTicketNonAfectes();
        this.personneEchangeTicketService$.changeUpdateTicketsNonAffectes(false);
      }
    });
    this.personneEchangeTicketService$.currentActiverTicketsNonAffectes.subscribe(activer => {
      console.log("Activer dans table ticket-nom-affectes:", activer);
      this.activer = activer;
    });
    this.personneEchangeTicketService$.currentRefPersonne.subscribe(refPersonne => {
      console.log("Nouvelles reference:", refPersonne);
      this.refPersonne = refPersonne;
    });
  }

  ngOnInit(): void {
    this.loadTicketNonAfectes();
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

  affecter(row: Ticket) {
    let links: Lien[] = row.links;
    const linkPourAffecter: Lien | undefined = links.find(link => (link.rel === 'affecter' && link.type === 'POST' && link.href.length !== 0));
    if (linkPourAffecter && this.refPersonne.id) {
      this.httpTicket!.affecter(linkPourAffecter.href, this.refPersonne.id).subscribe(() => {
        this.personneEchangeTicketService$.changeUpdateTicketsAffectes(true);
        this.loadTicketNonAfectes();
      });
    }
  }

  private loadTicketNonAfectes() {
    this.httpTicket!.nonAffecter().subscribe(
      (res) => {
        this.dataSource.data = res;
      });
  }

  isAffectable() {
    return (!this.activer && !this.refPersonne.id);
  }
}
