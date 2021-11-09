import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogueCategorieComponent} from './dialogue-categorie.component';

describe('DialogueCategorieComponent', () => {
  let component: DialogueCategorieComponent;
  let fixture: ComponentFixture<DialogueCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogueCategorieComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
