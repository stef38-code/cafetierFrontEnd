import {Component, EventEmitter, Inject, Input, OnInit, Optional, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Ticket} from "../../../../../shared/state/model/ticket";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Categorie} from "../../../../../shared/state/model/categorie";
import {Personne} from "../../../../../shared/state/model/personne";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {CategorieHttpService} from 'src/app/shared/services/categorie-http.service';
import {PersonneHttpService} from "../../../../../shared/services/personne-http.service";
import {Lien} from "../../../../../shared/state/model/lien";
import {PersonneEchangeTicketService} from "../../../../../shared/services/personne-echange-ticket.service";

@Component({
  selector: 'app-dialogue-personne',
  templateUrl: './dialogue-personne.component.html',
  styleUrls: ['./dialogue-personne.component.css']
})
export class DialoguePersonneComponent implements OnInit {
  dataSource: MatTableDataSource<Ticket> = new MatTableDataSource();
  selection = new SelectionModel<Ticket>(true, []);
  allowMultiSelect: boolean = true;

  @Input() displayedColumns: string[] = ['numero', 'montant', 'action'];

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  personneForm: FormGroup;
  private nom: FormControl;
  public elementsCategorie: Categorie[] = [];
  private prenom: FormControl;
  private categories: FormControl;
  @Output() add = new EventEmitter<Personne>();
  private data: Personne = {} as Personne;
  private httpCatgorie: CategorieHttpService;
  private httpPersonne: PersonneHttpService;
  private update: boolean = false;

  constructor(
    private personneEchangeTicketService$: PersonneEchangeTicketService,
    private _formBuilder: FormBuilder,
    @Optional() private dialogRef: MatDialogRef<DialoguePersonneComponent>,
    @Inject(MAT_DIALOG_DATA) public param: Lien,
    private http$: HttpClient
  ) {
    this.httpCatgorie = new CategorieHttpService(this.http$);
    this.httpPersonne = new PersonneHttpService(this.http$);
    this.personneEchangeTicketService$.currentUpdateSource.subscribe(update => {
      console.log("Message recu dans dialogue:", update);
      this.update = update;
    });

    this.nom = this._formBuilder.control('', Validators.required);
    this.prenom = this._formBuilder.control('', Validators.required);
    this.categories = this._formBuilder.control('', Validators.required);
    this.personneForm = this.createFormGroup(_formBuilder);
    //
    this.selection = new SelectionModel<Ticket>(this.allowMultiSelect, this.dataSource.data, false);
  }

  createFormGroup(formBuilder: FormBuilder) {
    return formBuilder.group({
      nom: this.nom,
      prenom: this.prenom,
      categorie: this.categories
    })
  }

  submitPersonne() {
    let categorieObject: Categorie = this.findCategorie(this.categories.value);
    const personne: Personne = Object.assign({}, this.data, {
      nom: this.nom.value,
      prenom: this.prenom.value,
      categorie: categorieObject,
    });

    //console.log('save Personne(categorie)', JSON.stringify(personne));
    this.httpPersonne.enregistrer(personne).subscribe(res => {
      this.data = res;
      this.dataSource.data = res.tickets ? res.tickets : [];
      console.log("Ticket de la personne", res.tickets);
      this.personneForm.patchValue({
        nom: res.nom,
        prenom: res.prenom,
        categorie: res.categorie ? res.categorie.id : ''
      });
      //this.personneEchangeTicketService$.changeUpdateSource(true);
      this.personneEchangeTicketService$.changeActiverTicketsAffectes(true);
      this.personneEchangeTicketService$.changeActiverTicketsNonAffectes(true);
      this.personneEchangeTicketService$.changeRefPersonne({
        id: this.data.id,
        links: this.data.links
      });
    });
  }

  findCategorie(id: string): Categorie {
    let categorie = this.elementsCategorie.find(obj => {
      return obj.id === id
    });
    if (categorie) {
      return categorie;
    }
    return {} as Categorie;
  }

  ngOnInit(): void {
    let href = this.param.href;
    if (href) {
      this.httpPersonne.editer(href).subscribe(res => {
        this.data = res;
        this.dataSource.data = res.tickets ? res.tickets : [];
        console.log("Ticket de la personne", res.tickets);
        this.personneForm.patchValue({
          nom: res.nom,
          prenom: res.prenom,
          categorie: res.categorie ? res.categorie.id : ''
        });
        this.personneEchangeTicketService$.changeActiverTicketsAffectes(true);
        this.personneEchangeTicketService$.changeActiverTicketsNonAffectes(true);
        this.personneEchangeTicketService$.changeRefPersonne({
          id: this.data.id,
          links: this.data.links
        });
      });
    }
    this.httpCatgorie.lister().subscribe(res => {
      this.elementsCategorie = res;
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.selection.clear();
  }

  save() {
    this.dialogRef.close(this.personneForm.value);
  }

  close() {
    this.dialogRef.close();
  }

  /***
   *
   */
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
}
