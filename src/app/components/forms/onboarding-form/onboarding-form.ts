import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

type OnboardingFormSubmit = {
  username: string;
}

@Component({
  selector: 'app-onboarding-form',
  imports: [ReactiveFormsModule],
  template: `
  <ng-content class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-surface">
    <form class="bg-white p-6 rounded shadow-md w-96 flex flex-col gap-4">
      <div class="text-xl font-bold">Welcome to DogFinder!</div>
      <div class="text-sm text-gray-600">Please enter your username to get started.</div>
      <input
        type="text"
        placeholder="Username"
        class="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
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
  onboardingForm = new FormGroup({
    username: new FormControl(''),
  })
}
