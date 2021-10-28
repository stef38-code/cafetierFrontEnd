import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs';

import {CollectionPersonneEffects} from './collection-personne.effects';

describe('CollectionPersonneEffects', () => {
  let actions$: Observable<any>;
  let effects: CollectionPersonneEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CollectionPersonneEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(CollectionPersonneEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
