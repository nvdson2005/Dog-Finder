import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly router = inject(Router);
  private readonly username = signal(localStorage.getItem('username') || '');

  get isAuthenticated() {
    return !!this.username();
  }

  setUsername(username: string) {
    this.username.set(username);
    localStorage.setItem('username', username);
  }

  clearUsername() {
    this.username.set('');
    localStorage.removeItem('username');
    this.router.navigate(['onboarding']);
  }

  getUsername() {
    return this.username();
  }
}
