import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth';

@Component({
  selector: 'app-onboarding-form',
  imports: [ReactiveFormsModule],
  template: `
  <ng-content class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-surface">
    <form [formGroup]="onboardingForm" class="bg-white p-6 rounded shadow-md w-96 flex flex-col gap-4" (submit)="onSubmit($event)">
      <div class="text-xl font-bold">Welcome to DogFinder!</div>
      <div class="text-sm text-gray-600">Please enter your username to get started.</div>
      <input
        type="text"
        placeholder="Username"
        class="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
        formControlName="username"
      />
      <button
        type="submit"
        class="bg-primary text-white py-2 rounded hover:bg-primary-dark transition-colors duration-300"
      >
        Get Started
      </button>
    </form>
  </ng-content>
  `,
  styles: ``,
})
export class OnboardingForm {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService)
  protected readonly onboardingForm = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required]
    }),
  })

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.onboardingForm.valid) {
      this.authService.setUsername(this.onboardingForm.value.username!);
      this.router.navigate(['/']);
    } else {
      // error('Form is invalid: ', this.onboardingForm.errors);
    }
  }
}
