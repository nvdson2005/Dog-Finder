import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpInterceptorFn,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

import { authInterceptor } from './auth-interceptor';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '@environments/environment.development';
import { firstValueFrom } from 'rxjs';

describe('authInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => authInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should have the x-api-key header set', async () => {
    const httpTesting = TestBed.inject(HttpTestingController);
    const httpClient = TestBed.inject(HttpClient);

    firstValueFrom(httpClient.get(environment.BASE_DOG_URL));

    const req = httpTesting.expectOne(environment.BASE_DOG_URL);
    expect(req.request.headers.get('x-api-key')).toBe(environment.API_KEY);
    req.flush({});
  });
});
