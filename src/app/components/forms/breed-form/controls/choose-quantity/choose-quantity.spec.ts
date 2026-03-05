import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseQuantity } from './choose-quantity';

describe('ChooseQuantity', () => {
  let component: ChooseQuantity;
  let fixture: ComponentFixture<ChooseQuantity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseQuantity]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseQuantity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
