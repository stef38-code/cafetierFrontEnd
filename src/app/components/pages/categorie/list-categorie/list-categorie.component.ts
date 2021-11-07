import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {ApplicationStore} from "../../../../shared/state/reducers";
import {SystemSelector} from "../../../../shared/state/selectors/system";

@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.css']
})
export class ListCategorieComponent implements OnInit {
  isLoading = false;

  private systemStore$: Observable<boolean>;

  constructor(private store: Store<ApplicationStore.State>) {
    this.systemStore$ = store.select(SystemSelector.getSystemLoading);
    //
    this.systemStore$.subscribe(res => this.isLoading = res);
  }

  ngOnInit(): void {

  }

}
