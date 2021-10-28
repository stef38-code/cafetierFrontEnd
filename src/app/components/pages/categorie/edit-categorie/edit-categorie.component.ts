import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Categorie} from "../../../../shared/state/model/categorie";

@Component({
  selector: 'app-edit-categorie',
  templateUrl: './edit-categorie.component.html',
  styleUrls: ['./edit-categorie.component.css']
})
export class EditCategorieComponent implements OnInit {
  form: FormGroup;
  description: string;

  constructor(
    private fb: FormBuilder,
    @Optional() private dialogRef: MatDialogRef<EditCategorieComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) {nom, libelle}: Categorie) {

    this.description = libelle;


    this.form = fb.group({
      nom: ['', Validators.required]
    });

  }

  ngOnInit() {

  }


  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }


}
