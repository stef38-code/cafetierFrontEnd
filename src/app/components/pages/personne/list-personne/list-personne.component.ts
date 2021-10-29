import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Personne} from "../../../../shared/state/model/personne";
import {Observable} from "rxjs";
import {PersonneSelector} from "../../../../shared/state/selectors/personne";
import {ApplicationStore} from "../../../../shared/state/reducers";
import {SystemSelector} from "../../../../shared/state/selectors/system";


@Component({
  selector: 'app-list-personne',
  templateUrl: './list-personne.component.html',
  styleUrls: ['./list-personne.component.css']
})
export class ListPersonneComponent implements OnInit {
  isLoading = false;
  private systemStore$: Observable<boolean>;
  public data: Personne[] = [];
  private personneEntitiesStore$: Observable<Personne[]>;

  constructor(
    private store: Store<ApplicationStore.State>,
  ) {
    this.personneEntitiesStore$ = store.select(PersonneSelector.getPersonneEntites);
    this.systemStore$ = store.select(SystemSelector.getSystemLoading);
    //
    this.systemStore$.subscribe(res => this.isLoading = res);
    this.personneEntitiesStore$.subscribe(res => {
      this.data = res;
      console.log("------------------", this.data);
    });
  }

  ngOnInit() {

  }


}

