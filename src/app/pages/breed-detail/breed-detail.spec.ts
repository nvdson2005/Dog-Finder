import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BASE_API_URL } from '@core/api/api.token';
import { BreedDetailsComponent } from './breed-detail';
import { BreedApiService } from '@core/api/breed.api';
import { DebugElement, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiBreedImage, Breed } from '@type/breed';
import { inject } from '@angular/core';
import { provideRouter, RouterLink } from '@angular/router';
import { By } from '@angular/platform-browser';

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
        provideRouter([]),
        MockBreedApiService,
        {
          provide: BASE_API_URL,
          useValue: 'https://mock-api.com',
        },
        {
          provide: BreedApiService,
          useExisting: MockBreedApiService,
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

  it('should fetch breed detail on breedId input change', () => {
    const breedId = 'abc123';
    fixture.detectChanges();
    const mockBreedApiService = TestBed.inject(BreedApiService);
    vi.spyOn(mockBreedApiService, 'fetchBreedDetail');
    fixture.componentRef.setInput('breedId', breedId);
    fixture.detectChanges();
    expect(mockBreedApiService.fetchBreedDetail).toHaveBeenCalledWith(breedId);
  });

  it('should render breed detail when breedData is available', async () => {
    const mockBreedData: Breed = {
      id: 'abc123',
      breedName: 'Test Breed',
      breedFor: 'Testing',
      weight: '10-20 kg',
      height: '30-40 cm',
      breedGroup: 'Test Group',
      temperament: 'Friendly, Active',
      lifeSpan: '10-12 years',
      url: 'https://example.com/image.jpg',
    };
    const mockBreedApiService = TestBed.inject(BreedApiService) as MockBreedApiService;
    mockBreedApiService.fetchBreedDetail$.next(mockBreedData);

    fixture.componentRef.setInput('breedId', 'abc123');
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.breed-name p')?.textContent).toContain('Test Breed');
    expect(compiled.querySelector('.breed-for p')?.textContent).toContain('Testing');
    expect(compiled.querySelector('.weight-height p')?.textContent).toContain(
      '10-20 kg and 30-40 cm',
    );
    expect(compiled.querySelector('.breed-group p')?.textContent).toContain('Test Group');
    expect(compiled.querySelector('.temperament p')?.textContent).toContain('Friendly, Active');
    expect(compiled.querySelector('.life-span p')?.textContent).toContain('10-12 years');
  });

  it('should not render breed detail when breedData is null', async () => {
    const mockBreedApiService = TestBed.inject(BreedApiService) as MockBreedApiService;
    mockBreedApiService.fetchBreedDetail$.next(null);

    fixture.componentRef.setInput('breedId', 'abc123');
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.breed-name')).toBeNull();
    expect(compiled.querySelector('.breed-for')).toBeNull();
    expect(compiled.querySelector('.weight-height')).toBeNull();
    expect(compiled.querySelector('.breed-group')).toBeNull();
    expect(compiled.querySelector('.temperament')).toBeNull();
    expect(compiled.querySelector('.life-span')).toBeNull();
  });

  it("should render 'No information ' when breedData fields are missing", async () => {
    const mockBreedData: Breed = {
      id: 'abc123',
      breedName: '',
      breedFor: '',
      weight: '',
      height: '',
      breedGroup: '',
      temperament: '',
      lifeSpan: '',
      url: 'https://example.com/image.jpg',
    };
    const mockBreedApiService = TestBed.inject(BreedApiService) as MockBreedApiService;
    mockBreedApiService.fetchBreedDetail$.next(mockBreedData);

    fixture.componentRef.setInput('breedId', 'abc123');
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.breed-name p')?.textContent).toContain('No information');
    expect(compiled.querySelector('.breed-for p')?.textContent).toContain('No information');
    expect(compiled.querySelector('.weight-height p')?.textContent).toContain(
      'No information and No information',
    );
    expect(compiled.querySelector('.breed-group p')?.textContent).toContain('No information');
    expect(compiled.querySelector('.temperament p')?.textContent).toContain('No information');
    expect(compiled.querySelector('.life-span p')?.textContent).toContain('No information');
  });
});
