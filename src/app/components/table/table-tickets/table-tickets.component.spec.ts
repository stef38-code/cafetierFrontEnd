import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TableTicketsComponent} from './table-tickets.component';

describe('TableTicketsComponent', () => {
  let component: TableTicketsComponent;
  let fixture: ComponentFixture<TableTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableTicketsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
