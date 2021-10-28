import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from "@angular/material/sort";
import {SelectionModel} from "@angular/cdk/collections";
import {Lien} from "../../../../shared/state/model/lien";
import {Ticket} from "../../../../shared/state/model/ticket";
import {Store} from "@ngrx/store";
import {Personne} from "../../../../shared/state/model/personne";
import {Observable} from "rxjs";
import {PersonneSelector} from "../../../../shared/state/selectors/personne";
import {PersonneAction} from "../../../../shared/state/actions/personne-action";
import {ApplicationStore} from "../../../../shared/state/reducers";
import {SystemSelector} from "../../../../shared/state/selectors/system";





@Component({
  selector: 'app-list-personne',
  templateUrl: './list-personne.component.html',
  styleUrls: ['./list-personne.component.css']
})
export class ListPersonneComponent implements OnInit {

  displayedColumns: string[] = ['select', 'numero', 'nom', 'prenom', 'nombreTicket', 'action'];
  dataSource: MatTableDataSource<Personne> = new MatTableDataSource();
  selection = new SelectionModel<Personne>(true, []);
  allowMultiSelect: boolean = true;
  isLoading = false;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  private personneEntitiesStore$: Observable<Personne[]>;
  private systemStore$: Observable<boolean>;

  constructor(private store: Store<ApplicationStore.State>) {
    this.personneEntitiesStore$= store.select(PersonneSelector.getPersonneEntites);
    this.systemStore$= store.select(SystemSelector.getSystemLoading);
    //
    this.personneEntitiesStore$.subscribe(res => this.dataSource = new MatTableDataSource<Personne>(res));
    this.systemStore$.subscribe(res => this.isLoading = res);
    this.selection = new SelectionModel<Personne>(this.allowMultiSelect, this.dataSource.data, false);


  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.store.dispatch(new PersonneAction.Load());
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

  openDialog(update: string, personne: Ticket) {
   /* if (window.confirm('êtes-vous sûr de supprimer '.concat(personne.nom, " ", personne.prenom, " ?"))) {
      let links: Lien[] = personne.links;
      let find: Lien | undefined = links.find(link => (link.rel === 'supprimer' && link.type === 'DELETE' && link.href.length !== 0));
      if (find) {
        console.log("url delete:".concat(find.href))
        this.httpPersonne.supprimer(find.href).subscribe((response: any) => {
          this.dataSource.data = response;
        });
      }
    }*/
  }

  isDesactiveEditer(row: Ticket): boolean {
    var links: Lien[] = row.links;
    return !links.find(link => (link.rel === 'self' && link.type === 'GET' && link.href.length !== 0));
  }

  isDesactiveSupprimer(row: Ticket) {
    var links: Lien[] = row.links;
    return !links.find(link => (link.rel === 'supprimer' && link.type === 'DELETE' && link.href.length !== 0));
  }

  editer(row: Ticket): any {
    var links: Lien[] = row.links;
    return links.find(link => (link.rel === 'self' && link.type === 'GET' && link.href.length !== 0));
  }

  editPersonne(row: Ticket):any {
    var links: Lien[] = row.links;
    let lienEditier: Lien | undefined = links.find(link => (link.rel === 'self' && link.type === 'GET' && link.href.length !== 0)) ;
    if (lienEditier) {
      return { id: lienEditier.href} ;
    }else{
      return { };
    }
  }

  editerPersonne(row: Personne) {
    this.store.dispatch(new PersonneAction.editerAction(row.id));
  }
}

