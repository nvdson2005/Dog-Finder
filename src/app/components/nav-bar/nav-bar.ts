import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  template: `
    <div class="fixed inset-0 w-screen h-18 bg-slate-500 flex items-center justify-between px-6">
      <a [routerLink]="['']" class="text-white ml-4 cursor-pointer">🐶</a>
      <a [routerLink]="['dashboard']" class="text-white text-xl font-bold cursor-pointer">
        Dashboard
      </a>
      <a [routerLink]="['']" class="text-white mr-4 cursor-pointer">🐕‍🦺</a>
    </div>
  `,
})
export class NavBar {}
