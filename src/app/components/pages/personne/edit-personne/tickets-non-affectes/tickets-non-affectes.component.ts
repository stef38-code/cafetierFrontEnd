import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Ticket} from "../../../../../shared/state/model/ticket";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Observable} from "rxjs";
import {Personne} from "../../../../../shared/state/model/personne";
import {Store} from "@ngrx/store";
import {ApplicationStore} from "../../../../../shared/state/reducers";
import {PersonneSelector} from "../../../../../shared/state/selectors/personne";
import {HttpClient} from "@angular/common/http";
import {TicketHttpService} from "../../../../../shared/services/ticket-http.service";
import {SystemAction} from "../../../../../shared/state/actions/system-action";
import {CollectionPersonneAction} from "../../../../../shared/state/actions/collection-personnes-action";
import {PersonneAction} from "../../../../../shared/state/actions/personne-action";
import {Lien} from "../../../../../shared/state/model/lien";
import {PersonneHttpService} from "../../../../../shared/services/personne-http.service";

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
  personne$: Observable<Personne>;
  tickets$!: Observable<Ticket[]>;
  private httpTicket: TicketHttpService;
  private httpPersonne: PersonneHttpService;

  constructor(private store: Store<ApplicationStore.State>, private http$: HttpClient) {
    this.personne$ = store.select(PersonneSelector.getPersonneSelected);
    this.personne$.subscribe(res => {
      this.idPersonne = res.id;
      this.links = res.links;
    });
    this.httpTicket = new TicketHttpService(this.http$)
    this.httpPersonne = new PersonneHttpService(this.http$)
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
    const linkediter: Lien | undefined = links.find(link => (link.rel === 'self' && link.type === 'GET' && link.href.length !== 0));
    console.log('les liens de la personne', this.links);
    const linkediterPersonne: Lien | undefined = this.links.find(link => (link.rel === 'self' && link.type === 'GET' && link.href.length !== 0));
    if (linkPourAffecter && linkediter) {
      this.httpTicket!.affecter(linkPourAffecter.href, this.idPersonne).subscribe(() => {
        /*this.store.dispatch(new SystemAction.Start());
        this.store.dispatch(new CollectionPersonneAction.Load());*/
        this.editer(linkediterPersonne!.href
        );
        /*this.store.dispatch(new SystemAction.Stop());*/
      });
    }
  }

  private loadTicketNonAfectes() {
    this.httpTicket!.nonAffecter().subscribe(
      (res) => {
        this.dataSource.data = res;
      });
  }

  private editer(url: string) {
    console.log("PersonneAction.editerAction", url)
    //    this.store.dispatch(new PersonneAction.editerAction(url));
    this.httpPersonne!.editer(url).subscribe((res) => {
      console.log("this.httpPersonne!.editer", res);
      this.store.dispatch(new SystemAction.Start());
      this.store.dispatch(new CollectionPersonneAction.Load());
      this.store.dispatch(new PersonneAction.editerAction(res));
      this.loadTicketNonAfectes();
      this.store.dispatch(new SystemAction.Stop());
    });
  }
}
