import { Component, computed, inject, signal, TemplateRef, viewChild } from '@angular/core';
import { NavBar } from '@components/nav-bar/nav-bar';
import { ApiBreedImage, FavoriteBreedResponse } from '@type/breed';
import { BreedApiPipe } from 'src/app/pipes/breed-api-pipe';
import { BreedApiService } from '@core/api/breed.api';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { DashboardTabContainer } from './dashboard-tab-container';
import { BreedContext } from './dashboard.directives';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardTabContainer, NavBar, BreedApiPipe],
  providers: [BreedApiService],
  template: `
    <div class="w-screen h-screen bg-slate-200">
      <app-nav-bar></app-nav-bar>
      <app-dashboard-tab-container
        [isLoading]="breedCount() === null"
        [likedBreedsList]="breedCount()"
      ></app-dashboard-tab-container>
    </div>
    <ng-template #breedDetails let-breed="breed">
      <div class="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 class="text-2xl font-bold mb-4">
            {{ breed!.breeds[0]?.name ?? 'A cute unnamed dog' }}
          </h2>
          <img
            class="w-full h-64 object-cover rounded-lg mb-4"
            [src]="breed!.url"
            [alt]="breed!.breeds[0]?.name ?? 'A cute unnamed dog' | breedApiPipe"
          />
          <p><strong>Temperament:</strong> {{ breed!.breeds[0]?.temperament | breedApiPipe }}</p>
          <p><strong>Life Span:</strong> {{ breed!.breeds[0]?.life_span | breedApiPipe }}</p>
          <p><strong>Origin:</strong> {{ breed!.breeds[0]?.origin | breedApiPipe }}</p>
          <button
            class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            (click)="chosenBreed.set(null)"
          >
            Close
          </button>
        </div>
      </div>
    </ng-template>
  `,
  styles: ``,
})
export class Dashboard {
  private readonly breedApiService = inject(BreedApiService);
  private readonly likedBreed = viewChild.required<TemplateRef<BreedContext>>('likedBreeds');
  private readonly noLikedBreed = viewChild.required<TemplateRef<BreedContext>>('noLikedBreeds');
  private readonly loadingTemplate =
    viewChild.required<TemplateRef<BreedContext>>('loadingTemplate');

  readonly breedCount = toSignal<FavoriteBreedResponse[] | null>(
    this.breedApiService
      .getFavorites()
      .pipe(tap((breeds) => console.log('Fetched liked breeds:', breeds))),
    { initialValue: null },
  );

  readonly templateToShow = computed(() =>
    this.breedCount() == null
      ? this.loadingTemplate
      : this.breedCount()!.length > 0
        ? this.likedBreed
        : this.noLikedBreed,
  );

  readonly chosenBreed = signal<ApiBreedImage | null>(null);

  showDetails(breed: ApiBreedImage) {
    this.chosenBreed.set(breed);
  }
}
