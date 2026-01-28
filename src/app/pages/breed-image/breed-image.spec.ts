import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BreedImageComponent } from './breed-image';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { signal } from '@angular/core';
describe('BreedImage', () => {
  let component: BreedImageComponent;
  let fixture: ComponentFixture<BreedImageComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedImageComponent, RouterModule],
      providers: [ {
        provide: ActivatedRoute,
        useValue: {}
      },
        {
          provide: ROUTER_OUTLET_DATA,
          useValue: signal({ id: 'abc123', url: 'https://example.com/dog.jpg' }),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BreedImageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
