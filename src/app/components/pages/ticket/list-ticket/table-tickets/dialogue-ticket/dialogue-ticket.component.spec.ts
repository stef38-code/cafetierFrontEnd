import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogueTicketComponent} from './dialogue-ticket.component';

describe('DialogueTicketComponent', () => {
  let component: DialogueTicketComponent;
  let fixture: ComponentFixture<DialogueTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogueTicketComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
