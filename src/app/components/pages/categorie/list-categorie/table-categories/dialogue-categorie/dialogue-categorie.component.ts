import {Component, Inject, OnInit, Optional} from '@angular/core';
import {Categorie} from "../../../../../../shared/state/model/categorie";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {CategorieHttpService} from "../../../../../../shared/services/categorie-http.service";
import {Lien} from "../../../../../../shared/state/model/lien";

@Component({
  selector: 'app-dialogue-categorie',
  templateUrl: './dialogue-categorie.component.html',
  styleUrls: ['./dialogue-categorie.component.css']
})
export class DialogueCategorieComponent implements OnInit {
  editForm: FormGroup;
  private nom: FormControl;
  private description: FormControl;
  private data: Categorie = {
    nom: '',
    libelle: '',
    links: [],
    id: ''
  };
  private httpCategorie: CategorieHttpService;

  constructor(
    private fb: FormBuilder,
    @Optional() private dialogRef: MatDialogRef<DialogueCategorieComponent>,
    @Inject(MAT_DIALOG_DATA) public param: Lien,
    private http$: HttpClient
  ) {
    this.httpCategorie = new CategorieHttpService(this.http$);

    this.nom = new FormControl('', [Validators.required]);
    this.description = new FormControl('', [Validators.required]);
    this.editForm = this.createFormGroup(fb);

  }

  ngOnInit(): void {
    let href = this.param.href;
    if (href) {
      this.httpCategorie.editer(href).subscribe(res => {
        this.data = res;
        this.nom.setValue(this.data.nom);
        this.description.setValue(this.data.libelle);
      });
    }
  }

  createFormGroup(formBuilder: FormBuilder) {
    return formBuilder.group({
      nom: this.nom,
      description: this.description,
    })
  }

  save() {
    this.dialogRef.close(this.editForm.value);
    const categorie: Categorie = Object.assign({}, this.data, {
      nom: this.nom.value,
      libelle: this.description.value
    });
    this.httpCategorie.enregister(categorie).subscribe(res => {
      this.data = res;
    });

    this.close();
  }

  isDesactiveSave(): boolean {
    return !(this.nom.value !== '' && this.description.value !== '');
  }

  close() {
    this.dialogRef.close();
  }
}
