import {Component, OnInit, Optional} from '@angular/core';
import {Store} from "@ngrx/store";
import {ApplicationStore} from "../../../shared/state/reducers";
import {Observable} from "rxjs";
import {Categorie} from "../../../shared/state/model/categorie";
import {CategorieSelector} from "../../../shared/state/selectors/categorie";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {CategorieAction} from "../../../shared/state/actions/categorie-action";

@Component({
  selector: 'app-dialogue-categorie',
  templateUrl: './dialogue-categorie.component.html',
  styleUrls: ['./dialogue-categorie.component.css']
})
export class DialogueCategorieComponent implements OnInit {
  editForm: FormGroup;
  private editCategorie$: Observable<Categorie>;
  private nom: FormControl;
  private description: FormControl;
  private id: FormControl;
  private data: Categorie = {
    nom: '',
    libelle: '',
    links: [],
    id: ''
  };

  constructor(
    private store: Store<ApplicationStore.State>,
    private fb: FormBuilder,
    @Optional() private dialogRef: MatDialogRef<DialogueCategorieComponent>) {
    this.editCategorie$ = store.select(CategorieSelector.getCategorieSelected);
    this.editCategorie$.subscribe(res => {
      this.data = res;
    });
    this.nom = new FormControl('', [Validators.required]);
    this.description = new FormControl('', [Validators.required]);
    this.id = new FormControl('');
    this.editForm = this.createFormGroup(fb);

  }

  ngOnInit(): void {
    this.editForm.patchValue({
      nom: this.data.nom,
      description: this.data.libelle,
      id: this.data.id
    });
  }

  createFormGroup(formBuilder: FormBuilder) {
    return formBuilder.group({
      nom: this.nom,
      description: this.description,
      id: this.id,
    })
  }

  save() {
    this.dialogRef.close(this.editForm.value);
    /*    console.log('save(this.editForm.value)',JSON.stringify(this.editForm.value));
        console.log('save(data)',JSON.stringify(this.data));*/
    const categorie: Categorie = Object.assign({}, this.data, {
      nom: this.nom.value,
      libelle: this.description.value
    });
    /*console.log('save(categorie)',JSON.stringify(categorie));*/

    this.store.dispatch(new CategorieAction.Add(categorie));

  }

  isDesactiveSave(): boolean {
    return !(this.nom.value !== '' && this.description.value !== '');
  }

  close() {
    this.dialogRef.close();
  }
}
