import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedDetailsComponent } from './breed-detail';

describe('BreedDetail', () => {
  let component: BreedDetailsComponent;
  let fixture: ComponentFixture<BreedDetailsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BreedDetailsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
