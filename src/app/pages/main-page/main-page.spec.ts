import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPage } from './main-page';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Injectable, InjectionToken } from '@angular/core';
import { BreedApiService } from '@core/api/breed.api';
import { from } from 'rxjs';
import { BASE_API_URL } from '@core/api/api.token';

const MOCK_BASE_API_URL = new InjectionToken('MOCK_BASE_API_URL', {
  factory: () => 'https://mock-api.com',
});

@Injectable()
class MockBreedApiService extends BreedApiService {
  override fetchBreedInfo() {
    return from([]);
  }
}
describe('MainPage', () => {
  let component: MainPage;
  let fixture: ComponentFixture<MainPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPage],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
        {
          provide: BASE_API_URL,
          useExisting: MOCK_BASE_API_URL,
        },
        provideHttpClient(),
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
});
