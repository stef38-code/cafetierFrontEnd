import {Component, OnInit} from '@angular/core';
import {PersonneAction} from "../../../shared/state/actions/personne-action";
import {Store} from "@ngrx/store";
import {ApplicationStore} from "../../../shared/state/reducers";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Personne} from "../../../shared/state/model/personne";
import {EditPersonneComponent} from "./edit-personne/edit-personne.component";

@Component({
  selector: 'app-personne',
  templateUrl: './personne.component.html',
  styleUrls: ['./personne.component.css']
})
export class PersonneComponent implements OnInit {
  public contentMargin = 0;

  constructor(private store: Store<ApplicationStore.State>, private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  newPersonne() {
    this.store.dispatch(new PersonneAction.editerAction(""));
  }

  editPersonne() {
    const dialogConfig = new MatDialogConfig<Personne>();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(EditPersonneComponent,
      dialogConfig);


    dialogRef.afterClosed().subscribe(
      val => console.log("Dialog output:", val)
    );

  }
}
