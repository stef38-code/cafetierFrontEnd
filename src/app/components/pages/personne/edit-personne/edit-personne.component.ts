import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-personne',
  templateUrl: './edit-personne.component.html',
  styleUrls: ['./edit-personne.component.css']
})
export class EditPersonneComponent implements OnInit {
  personneForm: FormGroup;
  private nom: FormControl;

  constructor(private _formBuilder: FormBuilder) {
    this.nom = new FormControl('', [Validators.required]);
    this.personneForm = this._formBuilder.group({
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
    });
  }
  submitPersonne() {
    console.log(this.personneForm.value);
  }
  ngOnInit(): void {
  }

}
