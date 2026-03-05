import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Breed } from '@type/breed';
import { ROUTER_OUTLET_DATA } from '@angular/router';
@Component({
  imports: [RouterLink],
  template: `
    <div class="w-full h-full rounded-2xl" [routerLink]="[breed().id]">
      <img [src]="breed().url" class="w-full h-full object-fit" alt="Dog Breed" />
    </div>
  `,
})
export class BreedImageComponent {
  breed = inject<() => Breed>(ROUTER_OUTLET_DATA);
}
