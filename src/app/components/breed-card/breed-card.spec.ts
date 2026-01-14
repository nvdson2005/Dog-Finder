import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedCard } from './breed-card';

describe('BreedCard', () => {
  let component: BreedCard;
  let fixture: ComponentFixture<BreedCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreedCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
