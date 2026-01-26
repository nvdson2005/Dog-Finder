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
    </div>
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

  showDetails(breed: ApiBreedImage) {
    this.chosenBreed.set(breed);
  }

  removeFromFavorites(breedId: number) {
    this.breedApiService.removeFromFavorites(breedId).subscribe(() => {
      this.refreshFavorites$.next();
    });
  }
}
