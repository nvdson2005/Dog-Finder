import { Component, inject } from '@angular/core';
import { RouterLink, ROUTER_OUTLET_DATA } from '@angular/router';
import { Breed } from '@type/breed';
@Component({
  imports: [RouterLink],
  template: `
    @let breedData = breed();
    <div [routerLink]="['']">
      <div class="w-full">
        <h6 class="text-2xl font-bold">Breed Name</h6>
        <p class="text-xl">{{ breedData.breedName }}</p>
      </div>
      <div class="w-full">
        <h6 class="text-2xl font-bold">Breed For</h6>
        <p class="text-xl">{{ breedData.breedFor }}</p>
      </div>
      <div class="w-full">
        <h6 class="text-2xl font-bold">Weight and Height</h6>
        <p class="text-xl">{{ breedData.weight }} and {{ breedData.height }}</p>
      </div>
      <div class="w-full">
        <h6 class="text-2xl font-bold">Breed Group</h6>
        <p class="text-xl">{{ breedData.breedGroup }}</p>
      </div>
      <div class="w-full">
        <h6 class="text-2xl font-bold">Temperament</h6>
        <p class="text-xl">{{ breedData.temperament }}</p>
      </div>
      <div class="w-full">
        <h6 class="text-2xl font-bold">Life Span</h6>
        <p class="text-xl">{{ breedData.lifeSpan }}</p>
      </div>
    </div>
  `,
})
export class BreedDetailsComponent {
  breed = inject<() => Breed>(ROUTER_OUTLET_DATA);
}
