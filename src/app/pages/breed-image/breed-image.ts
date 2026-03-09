import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Breed } from '@type/breed';
import { ROUTER_OUTLET_DATA } from '@angular/router';
@Component({
  imports: [RouterLink],
  template: `
    @if (breed(); as breed) {
      <div
        class="w-full h-full rounded-2xl"
        [routerLink]="[breed.id]"
        style="view-transition-name: breed-image-page"
      >
        <img [src]="breed.url" class="w-full h-full object-fit" alt="Dog Breed" />
      </div>
    }
  `,
})
export class BreedImageComponent {
  readonly breed = inject<() => Breed>(ROUTER_OUTLET_DATA);
}
