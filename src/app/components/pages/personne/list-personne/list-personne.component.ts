import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from "@angular/material/sort";
import {SelectionModel} from "@angular/cdk/collections";
import {HttpClient} from "@angular/common/http";
import {Lien} from "../../../../shared/state/model/lien.model";
import {Ticket} from "../../../../shared/state/model/ticket.model";
import {HttpPersonne} from "../../../../shared/backend/http-personne";
import {Store} from "@ngrx/store";



// @ts-ignore


@Component({
  selector: 'app-list-personne',
  templateUrl: './list-personne.component.html',
  styleUrls: ['./list-personne.component.css']
})
export class ListPersonneComponent implements OnInit {
  displayedColumns: string[] = ['select', 'numero', 'nom', 'prenom', 'nombreTicket', 'action'];
  dataSource: MatTableDataSource<Ticket> = new MatTableDataSource();
  selection = new SelectionModel<Ticket>(true, []);
  allowMultiSelect: boolean = true;
  private httpPersonne: HttpPersonne;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  constructor(private http: HttpClient,) {
    this.httpPersonne = new HttpPersonne(this.http);
    //this.getToutesLesPersonnes();
    this.selection = new SelectionModel<Ticket>(this.allowMultiSelect, this.dataSource.data, false);

  }

  private getToutesLesPersonnes() {
    this.httpPersonne!.lister().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }
  ngOnInit() {
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
    /*console.log("isDesactive");
    console.group();
    console.log(JSON.stringify(row));
    console.groupEnd();*/
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
}

