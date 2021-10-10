import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {HttpPersonne} from "../../../../shared/backend/http-personne";
import {Personne} from "../../../../model/personne";
@Component({
  selector: 'app-edit-personne',
  templateUrl: './edit-personne.component.html',
  styleUrls: ['./edit-personne.component.css']
})
export class EditPersonneComponent implements OnInit {
  personneForm: FormGroup;
  private nom: FormControl;
  private httpPersonne: HttpPersonne;

  constructor(private _formBuilder: FormBuilder,private http: HttpClient) {
    this.httpPersonne = new HttpPersonne(this.http);
    this.nom = new FormControl('', [Validators.required]);
    this.personneForm = this.createFormGroup(_formBuilder);
 /*     this._formBuilder.group({
      nom: [
        {
          value : '',
          disabled: false
        },
        Validators.required
      ],
      prenom: [
        {
          value : '',
          disabled: false
        },
        Validators.required
      ]
      ,
      numero: [
        {
          value : '',
          disabled: false
        },
        Validators.required
      ]
    });*/
  }

  createFormGroup(formBuilder: FormBuilder) {
    return formBuilder.group({
      nom: new FormControl(),
      prenom: new FormControl(),
      numero: new FormControl(),
    })
  }
  submitPersonne() {
    const personne: Personne = Object.assign({}, this.personneForm.value);
    this.httpPersonne!.addPersonne(personne).subscribe((response: any) => {
      console.log(response);
    },(error) => {                              //Error callback
      console.error('error caught in component')
      /*this.errorMessage = error;
      this.loading = false;*/
      console.log(error);
      alert(JSON.stringify(error));
      //throw error;   //You can also throw the error to a global error handler
    });
  }
  ngOnInit(): void {
  }

}
