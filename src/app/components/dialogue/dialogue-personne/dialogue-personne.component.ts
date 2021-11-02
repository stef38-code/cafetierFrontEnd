import {Component, EventEmitter, Input, OnInit, Optional, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Categorie} from "../../../shared/state/model/categorie";
import {Personne} from "../../../shared/state/model/personne";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {ApplicationStore} from "../../../shared/state/reducers";
import {MatDialogRef} from "@angular/material/dialog";
import {CollectionPersonneSelector} from "../../../shared/state/selectors/collection-personnes";
import {CollectionCategorieSelector} from "../../../shared/state/selectors/collection-categories";
import {MatTableDataSource} from "@angular/material/table";
import {Ticket} from "../../../shared/state/model/ticket";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

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
  personne$: Observable<Personne>;
  public elementsCategorie: Categorie[] = [];
  @Output() add = new EventEmitter<Personne>();
  private nom: FormControl;
  private prenom: FormControl;
  private categories: FormControl;
  private categorieObservable$: Observable<Categorie[]>;

  constructor(private route: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private store: Store<ApplicationStore.State>,
              @Optional() private dialogRef: MatDialogRef<DialoguePersonneComponent>
  ) {


    this.nom = this._formBuilder.control('nom', Validators.required);
    this.prenom = this._formBuilder.control('', Validators.required);
    this.categories = this._formBuilder.control('', Validators.required);
    this.personneForm = this.createFormGroup(_formBuilder);
    //
    this.personne$ = store.select(CollectionPersonneSelector.getSelectedPersonne);
    this.personne$.subscribe(res => {
      this.dataSource.data = res.tickets;
      this.personneForm.patchValue({
        nom: res.nom,
        prenom: res.prenom,
        categorie: res.categorie.id
      });
    });
    this.categorieObservable$ = store.select(CollectionCategorieSelector.getCategorieEntites);
    this.categorieObservable$.subscribe(res => {
      this.elementsCategorie = res;
    });
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
    const personne: Personne = Object.assign({}, this.personneForm.value);
    this.add.emit(personne);
  }

  ngOnInit(): void {
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

  openDialog(update: string, ticket: Ticket) {


  }

}

