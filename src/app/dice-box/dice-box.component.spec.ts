import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceBoxComponent } from './dice-box.component';

describe('DiceBoxComponent', () => {
  let component: DiceBoxComponent;
  let fixture: ComponentFixture<DiceBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiceBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiceBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
