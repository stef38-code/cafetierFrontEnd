import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TicketsNonAffectesComponent} from './tickets-non-affectes.component';

describe('TicketsNonAffectesComponent', () => {
  let component: TicketsNonAffectesComponent;
  let fixture: ComponentFixture<TicketsNonAffectesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketsNonAffectesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsNonAffectesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
