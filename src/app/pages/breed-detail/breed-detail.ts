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
      <div class="w-full h-full p-2" [routerLink]="['..']" style="view-transition-name: breed-detail-page">
        <div class="w-full breed-name">
          <h6 class="text-2xl font-bold">Breed Name</h6>
          <p class="text-xl">{{ breedData.breedName | breedApiPipe }}</p>
        </div>
        <div class="w-full breed-for">
          <h6 class="text-2xl font-bold">Breed For</h6>
          <p class="text-xl">{{ breedData.breedFor | breedApiPipe }}</p>
        </div>
        <div class="w-full weight-height">
          <h6 class="text-2xl font-bold">Weight and Height</h6>
          <p class="text-xl">
            {{ breedData.weight | breedApiPipe }} and {{ breedData.height | breedApiPipe }}
          </p>
        </div>
        <div class="w-full breed-group">
          <h6 class="text-2xl font-bold">Breed Group</h6>
          <p class="text-xl">{{ breedData.breedGroup | breedApiPipe }}</p>
        </div>
        <div class="w-full temperament">
          <h6 class="text-2xl font-bold">Temperament</h6>
          <p class="text-xl">{{ breedData.temperament | breedApiPipe }}</p>
        </div>
        <div class="w-full life-span">
          <h6 class="text-2xl font-bold">Life Span</h6>
          <p class="text-xl">{{ breedData.lifeSpan | breedApiPipe }}</p>
        </div>
      </div>
    }
  `,
})
export class BreedDetailsComponent {
  private readonly breedApiService = inject(BreedApiService);

  readonly breedId = input<string>('');

  private readonly breedId$ = toObservable(this.breedId);
  private readonly breedData$ = this.breedId$.pipe(
    switchMap((id) => this.breedApiService.fetchBreedDetail(id)),
  );

  readonly breedData = toSignal(this.breedData$, { initialValue: null });
}
