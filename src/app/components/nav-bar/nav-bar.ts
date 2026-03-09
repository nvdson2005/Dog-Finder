import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  template: `
    <div
      class="fixed inset-0 w-screen h-18 bg-primary flex items-center justify-between px-6 rounded-b-xl"
    >
      <span></span>
      <a [routerLink]="['/']" class="text-white text-xl font-bold cursor-pointer"> DogFinder </a>
      <a [routerLink]="['dashboard']" class="text-white cursor-pointer"> Dashboard </a>
    </div>
  `,
})
export class NavBar {}
