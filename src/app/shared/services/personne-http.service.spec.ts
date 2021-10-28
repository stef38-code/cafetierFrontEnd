import { TestBed } from '@angular/core/testing';

import { PersonneHttpService } from './personne-http.service';

describe('PersonneHttpService', () => {
  let service: PersonneHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonneHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
