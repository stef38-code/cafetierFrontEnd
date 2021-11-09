import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {ApplicationStore} from "./shared/state/reducers";

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
/*    this.store.dispatch(new CollectionPersonneAction.Load());
    this.store.dispatch(new CollectionCategorieAction.Load());
    this.store.dispatch(new CollectionTicketAction.Load());*/
  }
}
