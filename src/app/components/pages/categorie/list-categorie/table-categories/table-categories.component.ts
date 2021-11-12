import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Categorie} from "../../../../../shared/state/model/categorie";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Store} from "@ngrx/store";
import {ApplicationStore} from "../../../../../shared/state/reducers";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Lien} from "../../../../../shared/state/model/lien";
import {DialogueCategorieComponent} from "./dialogue-categorie/dialogue-categorie.component";
import {HttpClient} from "@angular/common/http";
import {CategorieHttpService} from "../../../../../shared/services/categorie-http.service";
import {FormBuilder, FormGroup} from "@angular/forms";

export interface myfilter {
  nom: string;
  libelle: string;
};

@Component({
  selector: 'app-table-categories',
  templateUrl: './table-categories.component.html',
  styleUrls: ['./table-categories.component.css']
})


export class TableCategoriesComponent implements OnInit {
  //todo https://stackblitz.com/edit/table-filtering-multiple-filters-example?file=app%2Ftable-filtering-example.ts
//todo https://stackblitz.com/edit/angular-material-table-multiple-filter

  /*displayedColumns: string[] = ['select', 'nom', 'libelle', 'action'];*/
  //displayedColumns: string[] = [ 'nom', 'libelle', 'action'];
  @Input() displayedColumns: string[] = ['nom', 'libelle', 'editer', "supprimer"];
  dataSource: MatTableDataSource<Categorie> = new MatTableDataSource();
  allowMultiSelect: boolean = true;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;


  readonly fControl: FormGroup;


  private httpCategorie: CategorieHttpService;


  constructor(private store: Store<ApplicationStore.State>,
              private dialog: MatDialog,
              private http$: HttpClient,
              formBuilder: FormBuilder
  ) {
    this.httpCategorie = new CategorieHttpService(this.http$);
    this.dataSource.filterPredicate = this.createFilter();
    this.fControl = formBuilder.group({
      nom: '',
      libelle: ''
    })
    this.fControl.valueChanges.subscribe(value => {
      const filter = {...value, nom: value.nom.trim().toLowerCase()} as string;
      this.dataSource.filter = filter;
    });
  }

  editCategorie(row: Categorie) {
    var links: Lien[] = row.links;
    //console.log("links:", row.links);
    let lienEditer = links.find(link => (link.rel === 'self' && link.type === 'GET' && link.href.length !== 0));
    if (lienEditer) {
      this.showDialogue(lienEditer);
    }
  }

  ngOnInit(): void {
    this.chargerLaliste();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  editNewCategorie() {
    this.showDialogue({} as Lien);
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

  private createFilter(): (categorie: Categorie, filter: string) => boolean {
    let filterFunction = function (categorie: Categorie, filter: string): boolean {

      let searchTerms = JSON.parse(JSON.stringify(filter));
      /*      console.log('-------filter------');
            console.group();
            console.log("values",searchTerms.nom,searchTerms.libelle);
            console.group();
            console.log("nom",(categorie.nom.toLowerCase().indexOf(searchTerms.nom.toLowerCase()) !== -1));
            console.log("libelle",(categorie.libelle.toLowerCase().indexOf(searchTerms.libelle.toLowerCase()) !== -1));
            console.groupEnd();
            console.log("Back to level 2");
            console.groupEnd();*/
      return categorie.nom.toLowerCase().indexOf(searchTerms.nom.toLowerCase()) !== -1
        && categorie.libelle.toLowerCase().indexOf(searchTerms.libelle.toLowerCase()) !== -1;
    }

    return filterFunction;
  }

  private chargerLaliste() {
    this.httpCategorie.lister().subscribe(res => {
      //console.log("=========================  Update des Catégories ====================================");
      this.dataSource.data = res;
    });
  }

  private showDialogue(lienEditer: Lien) {
    const dialogConfig = new MatDialogConfig<Lien>();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = lienEditer;
    const dialogRef = this.dialog.open(DialogueCategorieComponent,
      dialogConfig);
    dialogRef.afterClosed().subscribe(() =>
      this.chargerLaliste()
    );
  }

  supprimerCategorie(categorie: Categorie) {
    if (window.confirm('êtes-vous sûr de supprimer '.concat(categorie.nom, " ", categorie.libelle, " ?"))) {
      this.suppression(categorie);
    }
  }

  private translate() {
    this.paginator._intl.itemsPerPageLabel = 'Items par page';
    this.paginator._intl.nextPageLabel = 'Page suivante';
    this.paginator._intl.previousPageLabel = 'Page précédente';
    this.paginator._intl.firstPageLabel = 'Première page';
    this.paginator._intl.lastPageLabel = 'Dernière page';
  }

  private suppression(categorie: Categorie) {
    let links: Lien[] = categorie.links;
    let find: Lien | undefined = links.find(link => (link.rel === 'supprimer' && link.type === 'DELETE' && link.href.length !== 0));
    if (find) {
      //this.store.dispatch(new CategorieAction.Delete(categorie));
      //console.log("url delete:".concat(find.href))
      this.httpCategorie.delete(find.href).subscribe((response: any) => {
        this.chargerLaliste()
      });
    }
  }
}
