import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs';

import {CategorieEffectsEffects} from './categorie-effects.effects';

describe('CategorieEffectsEffects', () => {
  let actions$: Observable<any>;
  let effects: CategorieEffectsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategorieEffectsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(CategorieEffectsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
