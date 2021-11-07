import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TablePersonnesComponent} from './table-personnes.component';

describe('TablePersonnesComponent', () => {
  let component: TablePersonnesComponent;
  let fixture: ComponentFixture<TablePersonnesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablePersonnesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePersonnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
