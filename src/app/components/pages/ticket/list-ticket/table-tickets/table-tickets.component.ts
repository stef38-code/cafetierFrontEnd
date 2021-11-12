import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Ticket} from "../../../../../shared/state/model/ticket";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogueTicketComponent} from "./dialogue-ticket/dialogue-ticket.component";
import {HttpClient} from "@angular/common/http";
import {TicketHttpService} from "../../../../../shared/services/ticket-http.service";
import {Lien} from "../../../../../shared/state/model/lien";
import {Categorie} from "../../../../../shared/state/model/categorie";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Personne} from "../../../../../shared/state/model/personne";

@Component({
  selector: 'app-table-tickets',
  templateUrl: './table-tickets.component.html',
  styleUrls: ['./table-tickets.component.css']
})
export class TableTicketsComponent implements OnInit {
  dataSource: MatTableDataSource<Ticket> = new MatTableDataSource();

  @Input() displayedColumns: string[] = ['numero', 'montant', 'nom', 'prenom', 'liberer', 'editer', 'supprimer'];

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  links: Lien[] = {} as Lien[];
  private httpTicket: TicketHttpService;

  readonly fControl: FormGroup;

  constructor(private dialog: MatDialog,
              private http$: HttpClient,
              formBuilder: FormBuilder) {
    this.httpTicket = new TicketHttpService(this.http$);
    this.dataSource.filterPredicate = this.createFilter();
    this.fControl = formBuilder.group({
      numero: '',
      montant: '',
      nom: '',
      prenom: ''
    })
    this.fControl.valueChanges.subscribe(value => {
      const filter = {...value, numero: value.numero.trim().toLowerCase()} as string;
      this.dataSource.filter = filter;
    });
  }

  editDialog(row: Ticket) {
    var links: Lien[] = row.links;
    //console.log("links:", row.links);
    let lienEditer = links.find(link => (link.rel === 'self' && link.type === 'GET' && link.href.length !== 0));
    if (lienEditer) {
      this.showDialogue(lienEditer);
    }
  }

  private createFilter(): (ticket: Ticket, filter: string) => boolean {
    return (ticket: Ticket, filter: string): boolean => {

      let searchTerms = JSON.parse(JSON.stringify(filter));


      let testIdentifiant = this.getTestIdentifiant(ticket, searchTerms);
      let testMontant = this.getTestMontant(ticket, searchTerms);
      let testPersonneNom = this.getTestPersonneNom(ticket, searchTerms);
      let testPersonnePrenom = this.getTestPersonnePrenom(ticket, searchTerms);

      let b = testIdentifiant
        && testMontant
        && testPersonneNom
        && testPersonnePrenom;
      /*if(b){
        console.log('-------filter------');
        console.group();
        console.log(testIdentifiant,testMontant,testPersonneNom,testPersonnePrenom);
        console.log(ticket.numero,searchTerms.numero);
        console.log(ticket.montant,searchTerms.montant);
        if(ticket!.personne && ticket!.personne!.nom) {
          console.log(ticket!.personne!.nom, searchTerms.nom);
        }
        if(ticket!.personne && ticket!.personne!.prenom) {
          console.log(ticket!.personne!.prenom, searchTerms.prenom);
        }
        console.log("Resulat:",b);
        console.groupEnd();

      }*/
      return b;
    }
  }

  private getTestIdentifiant(ticket: Ticket, searchTerms: any) {
    let b = ticket.numero.toLowerCase().indexOf(searchTerms.numero.toLowerCase()) !== -1;
    /*console.group();
    console.log('numero',ticket.numero);
    console.log('filtre',searchTerms.numero);
    console.log('resultat',b);
    console.groupEnd();*/
    return b;
  }

  private getTestPersonnePrenom(ticket: Ticket, searchTerms: any) {
    let personne: Personne = ticket.personne;
    if ((!personne || !personne.prenom) && searchTerms.prenom) {
      return false;
    }
    if ((!personne || !personne.prenom) && !searchTerms.prenom) {
      return true;
    }

    let b = personne!.prenom.toLowerCase().indexOf(searchTerms.prenom.toLowerCase()) !== -1;
    return b;
  }

  private getTestPersonneNom(ticket: Ticket, searchTerms: any): boolean {
    let personne: Personne = ticket.personne;
    if ((!personne || !personne.nom) && searchTerms.nom) {
      return false;
    }
    if ((!personne || !personne.nom) && !searchTerms.nom) {
      return true;
    }

    let b = personne!.nom.toLowerCase().indexOf(searchTerms.nom.toLowerCase()) !== -1;
    return b;
  }

  ngOnInit() {
    this.chargerLaListe();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private getTestMontant(ticket: Ticket, searchTerms: any): boolean {
    //debugger;
    let b = ticket.montant.toString().toLowerCase().indexOf(searchTerms.montant.toLowerCase()) !== -1;
    return b;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAffecte(row: Ticket): boolean {
    if (row.personne && row.personne.nom && row.personne.prenom) {
      return true;
    }
    return false;
  }

  liberer(row: Categorie) {
    let links: Lien[] = row.links;
    const linkLiberer: Lien | undefined = links.find(link => (link.rel === 'liberer' && link.type === 'DELETE' && link.href.length !== 0));
    if (linkLiberer) {
      this.httpTicket!.liberer(linkLiberer.href).subscribe(() => this.chargerLaListe());
    }
  }

  supprimer(ticket: Ticket) {
    if (window.confirm('êtes-vous sûr de supprimer '.concat(ticket.numero, " ", String(ticket.montant), " ?"))) {
      this.suppression(ticket);
    }
  }

  private translate() {
    this.paginator._intl.itemsPerPageLabel = 'Items par page';
    this.paginator._intl.nextPageLabel = 'Page suivante';
    this.paginator._intl.previousPageLabel = 'Page précédente';
    this.paginator._intl.firstPageLabel = 'Première page';
    this.paginator._intl.lastPageLabel = 'Dernière page';
  }

  editNewDialog() {
    this.showDialogue({} as Lien);
  }

  private chargerLaListe() {
    this.httpTicket.lister().subscribe(
      res => {
        //console.log("Chargement des tickets-----", res);
        this.dataSource.data = res ? res : [];
      }
    );
  }

  private showDialogue(lienEditer: Lien) {
    const dialogConfig = new MatDialogConfig<Lien>();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = lienEditer;
    const dialogRef = this.dialog.open(DialogueTicketComponent,
      dialogConfig);
    dialogRef.afterClosed().subscribe(
      () => this.chargerLaListe()
    );
  }

  private suppression(ticket: Ticket) {
    let links: Lien[] = ticket.links;
    let find: Lien | undefined = links.find(link => (link.rel === 'supprimer' && link.type === 'DELETE' && link.href.length !== 0));
    if (find) {
      this.httpTicket.delete(find.href).subscribe((response: any) => {
        this.chargerLaListe()
      });
    }
  }
}
