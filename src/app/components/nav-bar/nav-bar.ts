import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  template: `
  <div class="fixed inset-0 w-screen h-18 bg-slate-500 flex items-center justify-between px-6">
    <p [routerLink]="['dog']" class="text-white ml-4">🐶</p>
    <h1 class="text-white text-xl font-bold">Dog Finder</h1>
    <p [routerLink]="['cat']" class="text-white mr-4">🐕‍🦺</p>
  </div>
  `,
  styles: ``,
})
export class NavBar {

}
