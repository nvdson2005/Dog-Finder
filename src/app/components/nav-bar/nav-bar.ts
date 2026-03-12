import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/auth';
@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  template: `
    <div
      class="fixed top-0 inset-x-0 h-18 bg-primary flex items-center gap-2 px-4 rounded-b-xl sm:px-6"
    >
      <div class="flex-1">
        @if (username(); as username) {
          <span class="text-white/80">{{ username }}</span>
          <button
            class="underline ml-4 text-sm text-white/80 hover:text-white transition-colors duration-300"
            (click)="authSerivce.clearUsername()"
          >
            Logout
          </button>
        }
      </div>
      <a
        [routerLink]="['/']"
        class="text-white font-bold cursor-pointer text-xl text-center max-lg:text-xl"
      >
        DogFinder
      </a>
      <div class="flex flex-1 justify-end">
        <a [routerLink]="['dashboard']" class="text-white cursor-pointer text-sm sm:text-base">
          Dashboard
        </a>
      </div>
    </div>
  `,
})
export class NavBar {
  protected readonly authSerivce = inject(AuthService);
  protected readonly username = signal(this.authSerivce.getUsername());
}
