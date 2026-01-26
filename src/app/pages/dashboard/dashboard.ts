import { Component, computed, inject, signal, TemplateRef, viewChild } from '@angular/core';
import { NavBar } from '@components/nav-bar/nav-bar';
import { ApiBreedImage, FavoriteBreedResponse } from '@type/breed';
import { BreedApiService } from '@core/api/breed.api';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { DashboardTabContainer } from './dashboard-tab-container';
import { BreedContext } from './dashboard.directives';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardTabContainer, NavBar],
  providers: [BreedApiService],
  template: `
    <div class="w-screen h-screen bg-slate-200">
      <app-nav-bar></app-nav-bar>
      <app-dashboard-tab-container
        [isLoading]="breedCount() === null"
        [likedBreedsList]="breedCount()"
        (breedRemoved)="this.removeFromFavorites($event)"
      ></app-dashboard-tab-container>
      <button (click)="toggleAddForm()" class="fixed bottom-5 right-5 w-15 h-15 bg-slate-500 rounded-xl flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 text-white m-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
    @if (openAddForm() === true) {
      <div class="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
        <div class="bg-white p-6 rounded shadow-md w-96">
          <h2 class="text-xl font-bold mb-4">Add New Breed to Favorites</h2>
          <form>
            <div class="mb-4">
              <label for="breedId" class="block text-gray-700">Breed ID:</label>
              <input
                id="breedId"
                formControlName="breedId"
                type="text"
                class="w-full px-3 py-2 border rounded"
                placeholder="Enter Breed ID"
              />
            </div>
            <div class="flex justify-end">
              <button
                type="button"
                (click)="toggleAddForm()"
                class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Add to Favorites
              </button>
            </div>
          </form>
        </div>
      </div>
    }
  `,
  styles: ``,
})
export class Dashboard {
  private readonly breedApiService = inject(BreedApiService);
  private readonly likedBreed = viewChild.required<TemplateRef<BreedContext>>('likedBreeds');
  private readonly noLikedBreed = viewChild.required<TemplateRef<BreedContext>>('noLikedBreeds');
  private readonly loadingTemplate =
    viewChild.required<TemplateRef<BreedContext>>('loadingTemplate');

  private readonly refreshFavorites$ = new BehaviorSubject<void>(undefined);

  readonly breedCount = toSignal<FavoriteBreedResponse[] | null>(
    this.refreshFavorites$.pipe(
      switchMap(() => {
        return this.breedApiService.getFavorites();
      }),
      tap(() => {
        console.log('Fetched favorite breeds');
      }),
    ),
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
  readonly openAddForm = signal(false);

  showDetails(breed: ApiBreedImage) {
    this.chosenBreed.set(breed);
  }

  removeFromFavorites(breedId: number) {
    this.breedApiService.removeFromFavorites(breedId).subscribe(() => {
      this.refreshFavorites$.next();
    });
  }

  toggleAddForm() {
    this.openAddForm.update((current) => !current);
  }
}
