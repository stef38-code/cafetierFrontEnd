import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs';

import {TicketEffectsEffects} from './ticket-effects.effects';

describe('TicketEffectsEffects', () => {
  let actions$: Observable<any>;
  let effects: TicketEffectsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TicketEffectsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(TicketEffectsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
