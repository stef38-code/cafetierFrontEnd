import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {ApplicationStore} from "../../../../shared/state/reducers";

@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.css']
})
export class ListTicketComponent implements OnInit {


  constructor(private store: Store<ApplicationStore.State>) {
  }

  ngOnInit() {
  }

}
