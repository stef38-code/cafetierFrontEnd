import { TestBed } from '@angular/core/testing';

import { CategorieHttpService } from './categorie-http.service';

describe('CategorieHttpService', () => {
  let service: CategorieHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorieHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
