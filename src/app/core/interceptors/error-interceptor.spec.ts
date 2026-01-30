import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './error-interceptor';
import { firstValueFrom } from 'rxjs';
import { environment } from '@environments/environment.development';

describe('errorInterceptorInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => errorInterceptor(req, next));
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
      ],
    });
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should catch and log errors from HTTP requests', async () => {
    const httpTesting = TestBed.inject(HttpTestingController);
    const httpClient = TestBed.inject(HttpClient);
    const errorPromise = firstValueFrom(httpClient.get(environment.BASE_DOG_URL));
    const req = httpTesting.expectOne(environment.BASE_DOG_URL);

    req.flush('Error occurred', { status: 500, statusText: 'Server Error' });
    await errorPromise.catch((error) => {
      expect(error.message).toBe('An error occurred during the HTTP request');
      expect(error.status).toBe(500);
      expect(error.statusText).toBe('Server Error');
      expect(error.originalError).toBeDefined();
    });
  });
});
