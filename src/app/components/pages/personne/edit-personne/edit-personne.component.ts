import {Component, EventEmitter, OnInit, Optional, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Personne} from "../../../../shared/state/model/personne";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {PersonneSelector} from "../../../../shared/state/selectors/personne";
import {ApplicationStore} from "../../../../shared/state/reducers";
import {MatDialogRef} from "@angular/material/dialog";
import {CategorieSelector} from "../../../../shared/state/selectors/categorie";
import {Categorie} from "../../../../shared/state/model/categorie";

@Component({
  selector: 'app-edit-personne',
  templateUrl: './edit-personne.component.html',
  styleUrls: ['./edit-personne.component.css']
})
export class EditPersonneComponent implements OnInit {
  personneForm: FormGroup;
  private nom: FormControl;
  public elementsCategorie: Categorie[] = [];
  private prenom: FormControl;
  private categories: FormControl;
  personne$: Observable<Personne>;
  private categorieObservable$: Observable<Categorie[]>;

  private sub: any;
  private order: string = '';
  private url: string = '';

  @Output() add = new EventEmitter<Personne>();

  constructor(private route: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private store: Store<ApplicationStore.State>,
              @Optional() private dialogRef: MatDialogRef<EditPersonneComponent>
  ) {
    this.nom = this._formBuilder.control('nom', Validators.required);
    this.prenom = this._formBuilder.control('', Validators.required);
    this.categories = this._formBuilder.control('', Validators.required);
    this.personneForm = this.createFormGroup(_formBuilder);
    //
    this.personne$ = store.select(PersonneSelector.getSelectedPersonne);
    this.personne$.subscribe(res => {
      console.log("categorie:", res.categorie.id);
      this.personneForm.patchValue({
        nom: res.nom,
        prenom: res.prenom,
        categorie: res.categorie.id
      });
    });
    this.categorieObservable$ = store.select(CategorieSelector.getCategorieEntites);
    this.categorieObservable$.subscribe(res => {
      this.elementsCategorie = res;
    });
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

  }

  save() {
    this.dialogRef.close(this.personneForm.value);
  }

  close() {
    this.dialogRef.close();
  }
}
