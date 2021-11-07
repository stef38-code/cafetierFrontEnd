import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Categorie} from "../../../shared/state/model/categorie";
import {DialogueCategorieComponent} from "../../dialogue/dialogue-categorie/dialogue-categorie.component";

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  editCategorie() {
    let row: Categorie = {
      id: '',
      nom: '',
      libelle: '',
      links: []
    };
    const dialogConfig = new MatDialogConfig<Categorie>();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    //dialogConfig.data = row;

    const dialogRef = this.dialog.open(DialogueCategorieComponent,
      dialogConfig);


    dialogRef.afterClosed().subscribe(
      val => console.log("Dialog output:", val)
    );

  }
}
