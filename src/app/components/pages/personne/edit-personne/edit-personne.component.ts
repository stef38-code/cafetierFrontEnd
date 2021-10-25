import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Personne} from "../../../../shared/state/model/personne";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {PersonneSelector} from "../../../../shared/state/selectors/personne";
import {ApplicationStore} from "../../../../shared/state/reducers";

@Component({
  selector: 'app-edit-personne',
  templateUrl: './edit-personne.component.html',
  styleUrls: ['./edit-personne.component.css']
})
export class EditPersonneComponent implements OnInit {
  personneForm: FormGroup;
  private nom: FormControl;
  personne$: Observable<Personne>;
  private sub: any;
  private order: string = '';
  private url: string = '';
  @Output() add = new EventEmitter<Personne>();

  constructor(private route: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private store: Store<ApplicationStore.State>
  ) {
    this.nom = this._formBuilder.control('nom', Validators.required);
    this.nom = new FormControl('', [Validators.required]);
    this.personneForm = this.createFormGroup(_formBuilder);
    //
    this.personne$ = store.select(PersonneSelector.getSelectedPersonne);
    this.personne$.subscribe( res => {
      this.personneForm.patchValue({
        nom: res.nom,
        prenom: res.prenom
      });
    });
  }

  createFormGroup(formBuilder: FormBuilder) {
    return formBuilder.group({
      nom: this.nom,
      prenom: new FormControl(),
      numero: new FormControl(),
    })
  }

  submitPersonne() {
    const personne: Personne = Object.assign({}, this.personneForm.value);
    this.add.emit(personne);
  }

  ngOnInit(): void {
  }

}
