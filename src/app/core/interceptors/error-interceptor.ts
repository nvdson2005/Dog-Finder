import { HttpInterceptorFn } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

const catchApiError =
  (message: string) =>
  <T>(inputObservable: Observable<T>) =>
    inputObservable.pipe(
      catchError((error) => {
        console.error(`${message}`, error);
        return throwError(() => new Error(message));
      }),
    );

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchApiError('An error occurred during the HTTP request'));
};
