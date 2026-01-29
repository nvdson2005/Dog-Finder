import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BASE_API_URL } from '@core/api/api.token';
import { BreedDetailsComponent } from './breed-detail';
import { BreedApiService } from '@core/api/breed.api';
import { Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiBreedImage, Breed } from '@type/breed';
import { inject } from '@angular/core';

const MOCK_BASE_API_URL = new InjectionToken('MOCK_BASE_API_URL', {
  factory: () => 'https://mock-api.com',
});
@Injectable()
class MockBreedApiService extends BreedApiService {
  readonly fetchBreedInfo$ = new BehaviorSubject<ApiBreedImage[]>([]);
  readonly fetchBreedDetail$ = new BehaviorSubject<Breed | null>(null);
  protected override baseUrl: string = inject(MOCK_BASE_API_URL);
  override fetchBreedInfo() {
    return this.fetchBreedInfo$.asObservable();
  }
  override fetchBreedDetail(_id: string) {
    return this.fetchBreedDetail$.asObservable();
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
          provide: BASE_API_URL,
          useValue: 'https://mock-api.com',
        },
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
