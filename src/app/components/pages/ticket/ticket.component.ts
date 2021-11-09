import {Component, OnInit} from '@angular/core';
import {Ticket} from "../../../shared/state/model/ticket";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Categorie} from "../../../shared/state/model/categorie";
import {TicketAction} from "../../../shared/state/actions/ticket-action";
import {DialogueTicketComponent} from "./list-ticket/dialogue-ticket/dialogue-ticket.component";
import {Store} from "@ngrx/store";
import {ApplicationStore} from "../../../shared/state/reducers";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  constructor(private store: Store<ApplicationStore.State>, private dialog: MatDialog,) {
  }

  ngOnInit(): void {
  }

  editDialog() {
    var id = null;
    let row: Ticket = {} as Ticket;
    const dialogConfig = new MatDialogConfig<Categorie>();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    //dialogConfig.data = row;
    this.store.dispatch(new TicketAction.Load(row));
    const dialogRef = this.dialog.open(DialogueTicketComponent,
      dialogConfig);


    dialogRef.afterClosed().subscribe(
      val => console.log("Dialog output:", val)
    );
  }
}
