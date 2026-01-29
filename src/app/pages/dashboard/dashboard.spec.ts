import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BASE_API_URL } from '@core/api/api.token';
import { Dashboard } from './dashboard';
import { BreedApiService } from '@core/api/breed.api';
import { Injectable, InjectionToken } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FavoriteBreedResponse } from '@type/breed';
import { Observable } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';

const MOCK_BASE_API_URL = new InjectionToken('MOCK_BASE_API_URL', {
  factory: () => 'https://mock-api.com',
});

@Injectable()
class MockBreedApiService extends BreedApiService {
  protected readonly fetchFavorites$ = new Observable<FavoriteBreedResponse[]>();
  override getFavorites(): Observable<FavoriteBreedResponse[]> {
    return this.fetchFavorites$;
  }
  override addToFavorites(_breedId: string): Observable<object> {
    return new Observable<object>();
  }
  // override addToFavorites(_breedId: string): Observable<any> {
  //   return new Observable();
  // }
  // override removeFromFavorites(_favoriteId: number): Observable<any> {
  //   return new Observable();
  // }
}
describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {},
        },
        {
          provide: BASE_API_URL,
          useExisting: MOCK_BASE_API_URL,
        },
        MockBreedApiService,
        {
          provide: BreedApiService,
          useClass: MockBreedApiService,
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
});
