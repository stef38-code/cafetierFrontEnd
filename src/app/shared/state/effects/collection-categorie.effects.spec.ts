import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CollectionCategorieEffects } from './collection-categorie.effects';

describe('CollectionCategorieEffects', () => {
  let actions$: Observable<any>;
  let effects: CollectionCategorieEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CollectionCategorieEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(CollectionCategorieEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
