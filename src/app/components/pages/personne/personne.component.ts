import {Component, OnInit} from '@angular/core';
import {CollectionPersonneAction} from "../../../shared/state/actions/collection-personnes-action";
import {Store} from "@ngrx/store";
import {ApplicationStore} from "../../../shared/state/reducers";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Personne} from "../../../shared/state/model/personne";
import {DialoguePersonneComponent} from "../../dialogue/dialogue-personne/dialogue-personne.component";
import {PersonneAction} from "../../../shared/state/actions/personne-action";

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
    this.store.dispatch(new PersonneAction.Clear());
  }

  editDialoguePersonne() {
    this.store.dispatch(new CollectionPersonneAction.editerAction(''));
    const dialogConfig = new MatDialogConfig<Personne>();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    /*    dialogConfig.width = 'auto';
        dialogConfig.height = 'auto';
        dialogConfig.*/
    /*   {
         19:        width: '50%',
         20:        height: '50%',
         21:        maxWidth: '100vw',
         22:        maxHeight: '100vh',
         23:      }*/

    const dialogRef = this.dialog.open(DialoguePersonneComponent,
      dialogConfig);


    dialogRef.afterClosed().subscribe(
      val => console.log("Dialog output:", val)
    );

  }
}
