import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {ApplicationStore} from "../../../shared/state/reducers";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {Personne} from "../../../shared/state/model/personne";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Observable} from "rxjs";
import {SystemSelector} from "../../../shared/state/selectors/system";
import {CollectionPersonneAction} from "../../../shared/state/actions/collection-personnes-action";
import {Ticket} from "../../../shared/state/model/ticket";
import {Lien} from "../../../shared/state/model/lien";
import {CollectionPersonneSelector} from "../../../shared/state/selectors/collection-personnes";
import {DialoguePersonneComponent} from "../../dialogue/dialogue-personne/dialogue-personne.component";
import {PersonneAction} from "../../../shared/state/actions/personne-action";

@Component({
  selector: 'app-table-personnes',
  templateUrl: './table-personnes.component.html',
  styleUrls: ['./table-personnes.component.css']
})
export class TablePersonnesComponent implements OnInit {

  /*displayedColumns: string[] = ['select', 'categorie', 'nom', 'prenom', 'nombreTicket', 'action'];*/
  //displayedColumns: string[] = [ 'categorie', 'nom', 'prenom', 'nombreTicket', 'action'];
  @Input() displayedColumns: string[] = ['categorie', 'nom', 'prenom', 'nombreTicket', 'action'];
  /*@Input() data: Personne[] = [];*/

  dataSource: MatTableDataSource<Personne> = new MatTableDataSource();
  selection = new SelectionModel<Personne>(true, []);
  allowMultiSelect: boolean = true;
  isLoading = false;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  private personneEntitiesStore$: Observable<Personne[]>;
  private systemStore$: Observable<boolean>;

  constructor(private store: Store<ApplicationStore.State>,
              private dialog: MatDialog) {
    this.personneEntitiesStore$ = store.select(CollectionPersonneSelector.getPersonneEntites);
    this.systemStore$ = store.select(SystemSelector.getSystemLoading);
    //
    this.personneEntitiesStore$.subscribe(res => this.dataSource.data = res);
    this.systemStore$.subscribe(res => this.isLoading = res);
    /*    this.dataSource = new MatTableDataSource<Personne>(this.data);*/
    this.selection = new SelectionModel<Personne>(this.allowMultiSelect, this.dataSource.data, true);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.store.dispatch(new CollectionPersonneAction.Load());
    this.selection.clear();
    this.translate();
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
    /* if (window.confirm('??tes-vous s??r de supprimer '.concat(personne.nom, " ", personne.prenom, " ?"))) {
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

  editPersonne(row: Ticket): any {
    var links: Lien[] = row.links;
    let lienEditier: Lien | undefined = links.find(link => (link.rel === 'self' && link.type === 'GET' && link.href.length !== 0));
    if (lienEditier) {
      return {id: lienEditier.href};
    } else {
      return {};
    }
  }

  editerPersonne(row: Personne) {
    this.store.dispatch(new PersonneAction.Load(row));
    //this.editDialoguePersonne();
  }

  editDialoguePersonne() {
    const dialogConfig = new MatDialogConfig<Personne>();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    /*    dialogConfig.width = 'auto';
        dialogConfig.height = 'auto';
        dialogConfig.*/
    /*   {
         19:        width: '50%',
         20:        height: '50%',
         21:        maxWidth: '100vw',
         22:        maxHeight: '100vh',
         23:      }*/

    const dialogRef = this.dialog.open(DialoguePersonneComponent,
      dialogConfig);


    dialogRef.afterClosed().subscribe(
      val => console.log("Dialog output:", val)
    );

  }

  getNomCategorie(row: Personne): string {
    if (row.categorie) return row.categorie.nom;

    return 'N/A';
  }

  private translate() {
    this.paginator._intl.itemsPerPageLabel = 'Items par page';
    this.paginator._intl.nextPageLabel = 'Page suivante';
    this.paginator._intl.previousPageLabel = 'Page pr??c??dente';
    this.paginator._intl.firstPageLabel = 'Premi??re page';
    this.paginator._intl.lastPageLabel = 'Derni??re page';
  }

  countTicket(row: Personne) {
    if (row.tickets && row.tickets.length > 0) {
      return row.tickets.length;
    }
    return 0;
  }

  Supprimer(personne: Personne) {
    if (window.confirm('??tes-vous s??r de supprimer '.concat(personne.nom, " ", personne.prenom, " ?"))) {
      this.suppression(personne);
    }
  }

  private suppression(personne: Personne) {
    let links: Lien[] = personne.links;
    let find: Lien | undefined = links.find(link => (link.rel === 'supprimer' && link.type === 'DELETE' && link.href.length !== 0));
    if (find) {
      this.store.dispatch(new PersonneAction.Delete(personne));
      /*console.log("url delete:".concat(find.href))
      this.httpPersonne.supprimer(find.href).subscribe((response: any) => {
        this.dataSource.data = response;
      });*/
    }
  }
}
