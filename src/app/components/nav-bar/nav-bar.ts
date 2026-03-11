import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  template: `
    <div
      class="fixed top-0 inset-x-0 h-18 bg-primary flex items-center gap-2 px-4 rounded-b-xl sm:px-6"
    >
      <div class="flex-1"></div>
      <a [routerLink]="['/']" class="text-white font-bold cursor-pointer text-xl text-center max-lg:text-xl"> DogFinder </a>
      <div class="flex flex-1 justify-end">
        <a [routerLink]="['dashboard']" class="text-white cursor-pointer text-sm sm:text-base"> Dashboard </a>
      </div>
    </div>
  `,
})
export class NavBar {}
