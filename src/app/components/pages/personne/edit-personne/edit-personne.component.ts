import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {HttpPersonne} from "../../../../shared/backend/http-personne";
import {Personne} from "../../../../shared/state/model/personne.model";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromRoot from '../../../../shared/state/reducers';
import * as fromPersonne from '../../../../shared/state/actions/personne.action';
@Component({
  selector: 'app-edit-personne',
  templateUrl: './edit-personne.component.html',
  styleUrls: ['./edit-personne.component.css']
})
export class EditPersonneComponent implements OnInit {
  personneForm: FormGroup;
  private nom: FormControl;
  private httpPersonne: HttpPersonne;
  private sub: any;
  private order: string='';
  private url: string='';
  @Output() add = new EventEmitter<Personne>();

  constructor(private route: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private http: HttpClient,
              private store: Store<fromRoot.State>
  ) {
    this.nom = this._formBuilder.control('nom', Validators.required);
    this.httpPersonne = new HttpPersonne(this.http);
    this.nom = new FormControl('', [Validators.required]);
    this.personneForm = this.createFormGroup(_formBuilder);
    this.route.queryParams
      .subscribe(params => {
        this.url = params.id;
        }
      );
    if(this.url){
      console.log("Edition d'une personne existante");
      this.httpPersonne.editer(this.url).subscribe((response: Personne) => {
        console.group();
          console.log(JSON.stringify(response));
          console.log(JSON.stringify(response.nom));
          this.personneForm.patchValue({
            nom: response.nom,
            prenom: response.prenom
          });
          this.personneForm.get('nom')!.updateValueAndValidity();
          this.personneForm.get('prenom')!.updateValueAndValidity();
        console.groupEnd();
      },error => {
        console.group();
        console.log(JSON.stringify(error));
        console.groupEnd();
        }
      );
    }
    let personne: Personne = {
      nom:'Robert',
      prenom:'Henry',
      id:'1111111111111',
      nombreTicket:12,
      numero:'1234',
      links:[]
    }
    let personne2: Personne = {
      nom:'Pompette',
      prenom:'Julie',
      id:'222222',
      nombreTicket:12,
      numero:'1234',
      links:[]
    }
   this.store.dispatch(new fromPersonne.Add(personne));
   this.store.dispatch(new fromPersonne.Add(personne2));
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
   /* this.httpPersonne!.ajouter(personne).subscribe((response: any) => {
      console.log(response);
    },(error) => {                              //Error callback
      console.error('error caught in component')
      console.log(error);
      alert(JSON.stringify(error));
    });*/
    this.add.emit(personne);
  }
  ngOnInit(): void {
  }

}
