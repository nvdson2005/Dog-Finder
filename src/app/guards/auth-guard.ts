import { inject } from '@angular/core';
import { AuthService } from '@core/auth/auth';
import { Router } from '@angular/router';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!authService.isAuthenticated) {
    console.warn('User is not authenticated, redirecting to onboarding...');
    return router.navigate(['onboarding']);
  }
  return true;
};
