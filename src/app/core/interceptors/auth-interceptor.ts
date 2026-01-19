import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const apiKey = environment.CAT_API_KEY;
  const modifiedReq = req.clone({
    setHeaders: {
      'x-api-key': apiKey,
    },
  });
  return next(modifiedReq);
};
