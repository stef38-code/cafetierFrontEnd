import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Categorie} from "../../../../shared/state/model/categorie";

@Component({
  selector: 'app-edit-categorie',
  templateUrl: './edit-categorie.component.html',
  styleUrls: ['./edit-categorie.component.css']
})
export class EditCategorieComponent implements OnInit {
  editForm: FormGroup;
  private data: Categorie;
  private nom: FormControl;
  private description: FormControl;

  constructor(
    private fb: FormBuilder,
    @Optional() private dialogRef: MatDialogRef<EditCategorieComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) data: Categorie) {
    this.data = data;
    console.log('Dialogue Row', data)
    this.editForm = this.createFormGroup(fb);
    this.nom = new FormControl('', [Validators.required]);
    this.description = new FormControl('', [Validators.required]);
  }

  ngOnInit() {
    this.editForm.patchValue({
      nom: this.data.nom,
      description: this.data.libelle
    });
  }

  createFormGroup(formBuilder: FormBuilder) {
    return formBuilder.group({
      nom: this.nom,
      description: this.description,
    })
  }

  save() {
    this.dialogRef.close(this.editForm.value);
  }

  isDesactiveSave(): boolean {
    return !(this.nom.value !== '' && this.description.value !== '');
  }

  close() {
    this.dialogRef.close();
  }


}
