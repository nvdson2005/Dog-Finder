import { Component } from '@angular/core';
import { NavBar } from '@components/nav-bar/nav-bar';
import { OnboardingForm } from "@components/forms/onboarding-form/onboarding-form";

@Component({
  selector: 'app-onboarding',
  imports: [NavBar, OnboardingForm],
  template: `
    <div class="w-screen h-screen flex items-center justify-center bg-surface">
      <app-nav-bar></app-nav-bar>
      <app-onboarding-form></app-onboarding-form>
    </div>
  `,
  styles: ``,
})
export class Onboarding {}
