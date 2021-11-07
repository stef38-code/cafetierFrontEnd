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
import {Lien} from "../../../../../shared/state/model/lien";
import {PersonneHttpService} from "../../../../../shared/services/personne-http.service";
import {TicketHttpService} from "../../../../../shared/services/ticket-http.service";
import {HttpClient} from "@angular/common/http";
import {CollectionPersonneAction} from "../../../../../shared/state/actions/collection-personnes-action";
import {SystemAction} from "../../../../../shared/state/actions/system-action";
import {PersonneAction} from "../../../../../shared/state/actions/personne-action";

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
  links: Lien[] = {} as Lien[]
  private httpTicket: TicketHttpService;
  private httpPersonne: PersonneHttpService;

  constructor(private store: Store<ApplicationStore.State>, private http$: HttpClient) {
    this.personne$ = store.select(PersonneSelector.getPersonneSelected);
    this.personne$.subscribe(res => {
      this.dataSource.data = res.tickets ? res.tickets : [];
      this.idPersonne = res.id;
      this.links = res.links;
    });
    this.httpTicket = new TicketHttpService(this.http$)
    this.httpPersonne = new PersonneHttpService(this.http$);
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
    const linkediterPersonne: Lien | undefined = this.links.find(link => (link.rel === 'self' && link.type === 'GET' && link.href.length !== 0));
    if (linkLiberer && linkediterPersonne) {
      this.httpTicket!.liberer(linkLiberer.href).unsubscribe();
      this.editer(linkediterPersonne.href);
    }
  }

  private editer(url: string) {
    console.log("PersonneAction.editerAction", url)
    //    this.store.dispatch(new PersonneAction.editerAction(url));
    this.httpPersonne!.editer(url).subscribe((res) => {
      console.log("this.httpPersonne!.editer", res);
      this.store.dispatch(new SystemAction.Start());
      this.store.dispatch(new CollectionPersonneAction.Load());
      this.store.dispatch(new PersonneAction.editerAction(res));
      this.store.dispatch(new SystemAction.Stop());
    });
  }
}
