import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BASE_API_URL } from '@core/api/api.token';
import { Dashboard } from './dashboard';
import { BreedApiService } from '@core/api/breed.api';
import { Injectable, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ApiBreedImage, FavoriteBreedResponse } from '@type/breed';
import { Observable, of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BreedFormSubmit } from '@components/forms/breed-form/breed-form';
const MOCK_BASE_API_URL = new InjectionToken('MOCK_BASE_API_URL', {
  factory: () => 'https://mock-api.com',
});

@Injectable()
class MockBreedApiService implements Partial<BreedApiService> {
  getFavorites(): Observable<FavoriteBreedResponse[]> {
    return of([]);
  }
  addToFavorites(_breedId: string): Observable<object> {
    return new Observable<object>();
  }
  removeFromFavorites(_favoriteId: number): Observable<object> {
    return of({});
  }
}
describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        provideHttpClientTesting(),
        provideRouter([]),
        {
          provide: BASE_API_URL,
          useExisting: MOCK_BASE_API_URL,
        },
        MockBreedApiService,
        {
          provide: BreedApiService,
          useExisting: MockBreedApiService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle openAddForm signal', () => {
    const initial = component.openAddForm();
    component.toggleAddForm();
    expect(component.openAddForm()).toBe(!initial);
  });

  it('should set chosenBreed signal', () => {
    const mockBreed: ApiBreedImage = {
      id: 'abc123',
      url: 'https://example.com/dog.jpg',
      breeds: [],
      width: 100,
      height: 100,
    };
    component.showDetails(mockBreed);
    expect(component.chosenBreed()).toEqual(mockBreed);
  });

  it('should call removeFromFavorites and refresh breedCount', async () => {
    const breedApiService = TestBed.inject(BreedApiService);
    vi.spyOn(breedApiService, 'removeFromFavorites');
    await component.removeFromFavorites(1);

    expect(breedApiService.removeFromFavorites).toHaveBeenCalledWith(1);
  });

  it('should handle onReceiveNewBreed correctly', () => {
    const initialLength = component['breedCount']()?.length || 0;
    const newBreed: BreedFormSubmit = {
      breedName: 'New Breed',
      breedImageUrl: 'https://example.com/new-dog.jpg',
      breedWeight: 50,
      breedAge: 5,
      breedHeight: 30,
      breedGroup: 'Working',
      breedTemperament: 'Friendly',
      breedLifeSpan: '10-12 years',
    };
    component.onReceiveNewBreed(newBreed);
    expect(component['breedCount']()?.length).toBe(initialLength + 1);
    expect(component['breedCount']()?.[initialLength].image.url).toBe(newBreed.breedImageUrl);
  });
});
