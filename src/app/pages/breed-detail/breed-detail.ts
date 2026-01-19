import { Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { BreedApiService } from '@core/api/breed.api';
import { BreedApiPipe } from 'src/app/pipes/breed-api-pipe';
@Component({
  imports: [RouterLink, BreedApiPipe],
  template: `
  @if (breedData(); as breedData) {
    <div class="w-full h-full p-2" [routerLink]="['']">
      <div class="w-full">
        <h6 class="text-2xl font-bold">Breed Name</h6>
        <p class="text-xl">{{ breedData.breedName | breedApi}}</p>
      </div>
      <div class="w-full">
        <h6 class="text-2xl font-bold">Breed For</h6>
        <p class="text-xl">{{ breedData.breedFor | breedApi}}</p>
      </div>
      <div class="w-full">
        <h6 class="text-2xl font-bold">Weight and Height</h6>
        <p class="text-xl">{{ breedData.weight | breedApi }} and {{ breedData.height | breedApi }}</p>
      </div>
      <div class="w-full">
        <h6 class="text-2xl font-bold">Breed Group</h6>
        <p class="text-xl">{{ breedData.breedGroup | breedApi }}</p>
      </div>
      <div class="w-full">
        <h6 class="text-2xl font-bold">Temperament</h6>
        <p class="text-xl">{{ breedData.temperament | breedApi }}</p>
      </div>
      <div class="w-full">
        <h6 class="text-2xl font-bold">Life Span</h6>
        <p class="text-xl">{{ breedData.lifeSpan | breedApi}}</p>
      </div>
    </div>
  }
  `,
})
export class BreedDetailsComponent {
  private readonly breedApiService = inject(BreedApiService)
  readonly breedId = input<string>('');
  private readonly breedId$ = toObservable(this.breedId);
  private readonly breedData$ = this.breedId$.pipe(
    switchMap((id) => this.breedApiService.fetchBreedDetail(id))
  )
  readonly breedData = toSignal(this.breedData$, { initialValue: null });
}
