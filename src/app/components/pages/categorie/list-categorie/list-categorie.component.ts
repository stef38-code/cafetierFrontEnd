import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Categorie} from "../../../../shared/state/model/categorie";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {ApplicationStore} from "../../../../shared/state/reducers";
import {SystemSelector} from "../../../../shared/state/selectors/system";
import {CategorieSelector} from "../../../../shared/state/selectors/categorie";
import {CategorieAction} from "../../../../shared/state/actions/categorie-action";
import {Ticket} from "../../../../shared/state/model/ticket";
import {Lien} from "../../../../shared/state/model/lien";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {EditCategorieComponent} from "../edit-categorie/edit-categorie.component";

@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.css']
})
export class ListCategorieComponent implements OnInit {
  displayedColumns: string[] = ['select', 'nom', 'libelle', 'action'];
  dataSource: MatTableDataSource<Categorie> = new MatTableDataSource();
  selection = new SelectionModel<Categorie>(true, []);
  allowMultiSelect: boolean = true;
  isLoading = false;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  private categorieEntitiesStore$: Observable<Categorie[]>;
  private systemStore$: Observable<boolean>;

  constructor(private store: Store<ApplicationStore.State>, private dialog: MatDialog) {
    this.categorieEntitiesStore$ = store.select(CategorieSelector.getCategorieEntites);
    this.systemStore$ = store.select(SystemSelector.getSystemLoading);
    //
    this.categorieEntitiesStore$.subscribe(res => this.dataSource = new MatTableDataSource<Categorie>(res));
    this.systemStore$.subscribe(res => this.isLoading = res);
    this.selection = new SelectionModel<Categorie>(this.allowMultiSelect, this.dataSource.data, false);

  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.store.dispatch(new CategorieAction.Load());
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

  isDesactiveEditer(row: Categorie): boolean {
    var links: Lien[] = row.links;
    return !links.find(link => (link.rel === 'self' && link.type === 'GET' && link.href.length !== 0));
  }

  isDesactiveSupprimer(row: Categorie) {
    var links: Lien[] = row.links;
    return !links.find(link => (link.rel === 'supprimer' && link.type === 'DELETE' && link.href.length !== 0));
  }

  editer(row: Categorie): any {
    var links: Lien[] = row.links;
    return links.find(link => (link.rel === 'self' && link.type === 'GET' && link.href.length !== 0));
  }

  editCourse(row: Categorie) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      nom: row.nom, libelle: row.libelle
    };

    const dialogRef = this.dialog.open(EditCategorieComponent,
      dialogConfig);


    dialogRef.afterClosed().subscribe(
      val => console.log("Dialog output:", val)
    );

  }
}
