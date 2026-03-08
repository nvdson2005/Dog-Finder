import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPage } from './main-page';
import { provideRouter } from '@angular/router';
import * as http from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Injectable, InjectionToken } from '@angular/core';
import { BreedApiService } from '@core/api/breed.api';
import { from } from 'rxjs';
import { BASE_API_URL } from '@core/api/api.token';
import { ApiBreedImage } from '@type/breed';

const MOCK_BASE_API_URL = new InjectionToken('MOCK_BASE_API_URL', {
  factory: () => 'https://mock-api.com',
});

@Injectable()
class MockBreedApiService extends BreedApiService {
  override fetchBreedInfo() {
    return from([]);
  }
  override addToFavorites(_breedId: string) {
    return from([{}]);
  }
}
describe('MainPage', () => {
  let component: MainPage;
  let fixture: ComponentFixture<MainPage>;
  const mockDogs: ApiBreedImage[] = [
    { id: 'dog1', url: 'url1', breeds: [], width: 100, height: 100 },
    { id: 'dog2', url: 'url2', breeds: [], width: 100, height: 100 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPage],
      providers: [
        provideRouter([]),
        {
          provide: BASE_API_URL,
          useExisting: MOCK_BASE_API_URL,
        },
        http.provideHttpClient(),
        provideHttpClientTesting(),
        MockBreedApiService,
        {
          provide: BreedApiService,
          useClass: MockBreedApiService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial values', () => {
    expect(component.PAGE_SIZE).toBeDefined();
    expect(component['currentIndex']()).toBe(0);
    expect(component['dogList']()).toEqual([]);
  });

  it('should compute currentPage correctly', () => {
    component['currentIndex'].set(0);
    expect(component['currentPage']()).toBe(1);

    component['currentIndex'].set(10);
    expect(component['currentPage']()).toBe(2);

    component['currentIndex'].set(25);
    expect(component['currentPage']()).toBe(3);
  });

  it('should compute currentDog correctly', () => {
    component['dogList']().push(...mockDogs);

    component['currentIndex'].set(1);
    expect(component['currentDog']()).toEqual(mockDogs[1]);

    component['currentIndex'].set(0);
    expect(component['currentDog']()).toEqual(mockDogs[0]);
  });

  it('should increment currentIndex on nextDog', () => {
    const initialIndex = component['currentIndex']();
    component.nextDog();
    expect(component['currentIndex']()).toBe(initialIndex + 1);
  });

  // it('should call addToFavorites on like', async () => {
  //   vi.spyOn(component['breedApiService'], 'addToFavorites');
  //   component['dogList']().push(...mockDogs);
  //   component['currentIndex'].set(1);
  //   await component.nextDog(true);
  //   expect(component['breedApiService'].addToFavorites).toHaveBeenCalled();
  //   expect(component['currentIndex']()).toBe(1);
  // });

  // it('should not call addToFavorites on dislike', async () => {
  //   vi.spyOn(component['breedApiService'], 'addToFavorites');
  //   component['dogList']().push(...mockDogs);
  //   component['currentIndex'].set(1);
  //   const initialIndex = component['currentIndex']();
  //   await component.nextDog(false);
  //   expect(component['breedApiService'].addToFavorites).not.toHaveBeenCalled();
  //   expect(component['currentIndex']()).toBe(initialIndex + 1);
  // });
});
