import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CollectionTicketEffects } from './collection-ticket.effects';

describe('CollectionTicketEffects', () => {
  let actions$: Observable<any>;
  let effects: CollectionTicketEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CollectionTicketEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(CollectionTicketEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
