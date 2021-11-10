import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TicketsAffectesComponent} from './tickets-affectes.component';

describe('TicketsAffectesComponent', () => {
  let component: TicketsAffectesComponent;
  let fixture: ComponentFixture<TicketsAffectesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketsAffectesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsAffectesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
