import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedDetailsComponent } from './breed-detail';
import { BreedApiService } from '@core/api/breed.api';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiBreedImage } from '@type/breed';

@Injectable()
class MockBreedApiService implements Partial<BreedApiService> {
  readonly fetchBreedInfo$ = new BehaviorSubject<ApiBreedImage[]>([]);
  fetchBreedInfo() {
    return this.fetchBreedInfo$.asObservable();
  }
}

describe('BreedDetail', () => {
  let component: BreedDetailsComponent;
  // let breedApi: MockBreedApiService;
  let fixture: ComponentFixture<BreedDetailsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedDetailsComponent],
      providers: [
        MockBreedApiService,
        {
          provide: BreedApiService,
          useExisting: MockBreedApiService
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BreedDetailsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
