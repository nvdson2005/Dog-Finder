import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly router = inject(Router);
  private readonly _username = signal(localStorage.getItem('username') || '');
  readonly username = this._username.asReadonly();

  get isAuthenticated() {
    return !!this.username();
  }

  setUsername(username: string) {
    this._username.set(username);
    localStorage.setItem('username', username);
  }

  clearUsername() {
    this._username.set('');
    localStorage.removeItem('username');
    this.router.navigate(['onboarding']);
  }

  getUsername() {
    return this.username();
  }
}
