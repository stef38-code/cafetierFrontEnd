import {TestBed} from '@angular/core/testing';

import {PersonneEchangeTicketService} from './personne-echange-ticket.service';

describe('PersonneEchangeTicketService', () => {
  let service: PersonneEchangeTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonneEchangeTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
