import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {Personne} from "../../../../../shared/state/model/personne";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Ticket} from "../../../../../shared/state/model/ticket";
import {Lien} from "../../../../../shared/state/model/lien";
import {HttpClient} from "@angular/common/http";
import {PersonneHttpService} from "../../../../../shared/services/personne-http.service";
import {DialoguePersonneComponent} from "../dialogue-personne/dialogue-personne.component";

@Component({
  selector: 'app-table-personnes',
  templateUrl: './table-personnes.component.html',
  styleUrls: ['./table-personnes.component.css']
})
export class TablePersonnesComponent implements OnInit {
  @Input() displayedColumns: string[] = ['categorie', 'nom', 'prenom', 'nombreTicket', 'action'];

  dataSource: MatTableDataSource<Personne> = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  private httpPersonne: PersonneHttpService;

  constructor(private dialog: MatDialog, private http$: HttpClient) {
    this.httpPersonne = new PersonneHttpService(this.http$);
  }

  ngOnInit(): void {
    this.chargerLaListe();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.translate();
  }

  editPersonne(row: Ticket) {
    const links: Lien[] = row.links;
    let lienEditer: Lien | undefined = links.find(link => (link.rel === 'self' && link.type === 'GET' && link.href.length !== 0));
    if (lienEditer) {
      this.showDialogue(lienEditer);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isDesactiveEditer(row: Ticket): boolean {
    var links: Lien[] = row.links;
    return !links.find(link => (link.rel === 'self' && link.type === 'GET' && link.href.length !== 0));
  }

  isDesactiveSupprimer(row: Ticket) {
    var links: Lien[] = row.links;
    return !links.find(link => (link.rel === 'supprimer' && link.type === 'DELETE' && link.href.length !== 0));
  }

  private chargerLaListe() {
    this.httpPersonne.lister().subscribe(res => this.dataSource.data = res);
  }

  getNomCategorie(row: Personne): string {
    if (row.categorie) return row.categorie.nom;
    return 'N/A';
  }

  private translate() {
    this.paginator._intl.itemsPerPageLabel = 'Items par page';
    this.paginator._intl.nextPageLabel = 'Page suivante';
    this.paginator._intl.previousPageLabel = 'Page précédente';
    this.paginator._intl.firstPageLabel = 'Première page';
    this.paginator._intl.lastPageLabel = 'Dernière page';
  }

  countTicket(row: Personne) {
    if (row.tickets && row.tickets.length > 0) {
      return row.tickets.length;
    }
    return 0;
  }

  Supprimer(personne: Personne) {
    if (window.confirm('êtes-vous sûr de supprimer '.concat(personne.nom, " ", personne.prenom, " ?"))) {
      this.suppression(personne);

    }
  }

  editNewDialog() {
    this.showDialogue({} as Lien);
  }

  private suppression(personne: Personne) {
    let links: Lien[] = personne.links;
    let find: Lien | undefined = links.find(link => (link.rel === 'supprimer' && link.type === 'DELETE' && link.href.length !== 0));
    if (find) {
      console.log("------------ Suppresion d'un nouvelle personne --------------", find.href);
      this.httpPersonne!.supprimer(find.href).subscribe(() => {
        this.httpPersonne.lister().subscribe(res => this.dataSource.data = res);
      });
    }
  }

  private showDialogue(lienEditer: Lien) {
    const dialogConfig = new MatDialogConfig<Lien>();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = lienEditer;
    const dialogRef = this.dialog.open(DialoguePersonneComponent,
      dialogConfig);
    dialogRef.afterClosed().subscribe(
      () => this.chargerLaListe()
    );
  }
}
