import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialoguePersonneComponent} from './dialogue-personne.component';

describe('DialoguePersonneComponent', () => {
  let component: DialoguePersonneComponent;
  let fixture: ComponentFixture<DialoguePersonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialoguePersonneComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialoguePersonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
