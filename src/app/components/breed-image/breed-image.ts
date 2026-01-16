import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Breed } from '@type/breed';
import { ROUTER_OUTLET_DATA } from '@angular/router';
@Component({
  imports: [RouterLink],
  template: `
    <div [routerLink]="['details']">
      <img [src]="breed().imageUrl" class="w-full object-cover" alt="Dog Breed" />
      <div class="absolute bottom-2 left-2 w-3/4 bg-black/90 bg-opacity-50 text-white p-2">
        <h2 class="text-lg font-bold">{{ breed().breedName }}</h2>
        <p class="text-sm">Breed For {{ breed().breedFor }}</p>
      </div>
    </div>
  `,
})
export class BreedImageComponent {
  breed = inject<() => Breed>(ROUTER_OUTLET_DATA);
}
