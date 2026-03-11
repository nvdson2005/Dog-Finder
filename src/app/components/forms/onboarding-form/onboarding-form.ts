import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

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
    </form>
  </ng-content>
  `,
  styles: ``,
})
export class OnboardingForm {

}
