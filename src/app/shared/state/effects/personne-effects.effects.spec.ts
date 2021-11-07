import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs';

import {PersonneEffectsEffects} from './personne-effects.effects';

describe('PersonneEffectsEffects', () => {
  let actions$: Observable<any>;
  let effects: PersonneEffectsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PersonneEffectsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(PersonneEffectsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
