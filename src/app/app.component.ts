import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {ApplicationStore} from "./shared/state/reducers";
import {PersonneAction} from "./shared/state/actions/personne-action";
import {CategorieAction} from "./shared/state/actions/categorie-action";
import {TicketAction} from "./shared/state/actions/ticket-action";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cafetierFrontEnd';
  contentMargin: any;

  constructor(private store: Store<ApplicationStore.State>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new PersonneAction.Load());
    this.store.dispatch(new CategorieAction.Load());
    this.store.dispatch(new TicketAction.Load());
  }
}
