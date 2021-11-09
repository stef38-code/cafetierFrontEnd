import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogueCategorieComponent} from "./list-categorie/table-categories/dialogue-categorie/dialogue-categorie.component";
import {Lien} from "../../../shared/state/model/lien";
import {Router} from "@angular/router";

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {

  constructor(private dialog: MatDialog, private router: Router) {
  }

  ngOnInit(): void {
  }

  editCategorie() {

    const dialogConfig = new MatDialogConfig<Lien>();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {} as Lien;

    const dialogRef = this.dialog.open(DialogueCategorieComponent,
      dialogConfig);


    dialogRef.afterClosed().subscribe(
      val => {
        console.log("Dialog output:", val);
        this.router.routeReuseStrategy.shouldReuseRoute = () => true;
      }
    );

  }
}
