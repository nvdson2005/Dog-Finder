import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedImageComponent } from './breed-image';

describe('BreedImage', () => {
  let component: BreedImageComponent;
  let fixture: ComponentFixture<BreedImageComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedImageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BreedImageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
