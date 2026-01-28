import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPage } from './main-page';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BASE_API_URL } from '@core/api/api.token';
import { environment } from '@environments/environment.development';
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
          useValue: environment.BASE_DOG_URL,
        },
        provideHttpClient(),
        provideHttpClientTesting(),
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
