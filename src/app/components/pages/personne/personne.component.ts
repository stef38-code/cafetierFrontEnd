import { Component, OnInit } from '@angular/core';
import {PersonneAction} from "../../../shared/state/actions/personne-action";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../../shared/state/reducers";
import {ApplicationStore} from "../../../shared/state/reducers";

@Component({
  selector: 'app-personne',
  templateUrl: './personne.component.html',
  styleUrls: ['./personne.component.css']
})
export class PersonneComponent implements OnInit {
  public contentMargin = 0;

  constructor(private store: Store<ApplicationStore.State>) { }

  ngOnInit(): void {
  }

  newPersonne() {
    this.store.dispatch(new PersonneAction.editerAction(""));
  }
}
