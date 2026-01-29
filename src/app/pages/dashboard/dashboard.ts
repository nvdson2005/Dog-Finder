import { Component, computed, inject, signal, TemplateRef, viewChild } from '@angular/core';
import { NavBar } from '@components/nav-bar/nav-bar';
import { ApiBreedImage, FavoriteBreedResponse } from '@type/breed';
import { BreedApiService } from '@core/api/breed.api';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, firstValueFrom, switchMap } from 'rxjs';
import { DashboardTabContainer } from './dashboard-tab-container';
import { BreedContext } from './dashboard.directives';
import { BreedForm } from '@components/forms/breed-form/breed-form';
import { BreedFormSubmit } from '@components/forms/breed-form/breed-form';
@Component({
  selector: 'app-dashboard',
  imports: [DashboardTabContainer, NavBar, BreedForm],
  template: `
    <div class="w-screen h-screen bg-slate-200">
      <app-nav-bar></app-nav-bar>
      <app-dashboard-tab-container
        [isLoading]="breedCount() === null"
        [likedBreedsList]="breedCount()"
        (breedRemoved)="this.removeFromFavorites($event)"
      ></app-dashboard-tab-container>
      <button
        (click)="toggleAddForm()"
        class="fixed bottom-5 right-5 w-15 h-15 bg-slate-500 rounded-xl flex items-center justify-center"
      >
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
      <app-breed-form
        (formClosed)="toggleAddForm()"
        (breedSubmitted)="onReceiveNewBreed($event)"
      ></app-breed-form>
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

  protected readonly breedCount = toSignal<FavoriteBreedResponse[] | null>(
    this.refreshFavorites$.pipe(
      switchMap(() => {
        return this.breedApiService.getFavorites();
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

  async removeFromFavorites(breedId: number) {
    await firstValueFrom(this.breedApiService.removeFromFavorites(breedId));
    this.refreshFavorites$.next();
  }

  toggleAddForm() {
    this.openAddForm.update((current) => !current);
  }

  onReceiveNewBreed(breed: BreedFormSubmit) {
    this.breedCount()?.push({
      id: Math.random(),
      created_at: new Date().toISOString(),
      image_id: '',
      sub_id: '',
      image: {
        id: '',
        url: breed.breedImageUrl,
        breeds: [
          {
            weight: { imperial: '', metric: '' },
            id: '',
            name: breed.breedName,
            temperament: breed.breedTemperament,
            origin: '',
            country_codes: '',
            country_code: '',
            description: '',
            life_span: breed.breedLifeSpan,
            indoor: 0,
            lap: 0,
            alt_names: '',
            adaptability: 0,
            affection_level: 0,
            child_friendly: 0,
            dog_friendly: 0,
            energy_level: 0,
            grooming: 0,
            health_issues: 0,
            intelligence: 0,
            shedding_level: 0,
            social_needs: 0,
            stranger_friendly: 0,
            vocalisation: 0,
            experimental: 0,
            hairless: 0,
            natural: 0,
            rare: 0,
            rex: 0,
            suppressed_tail: 0,
            short_legs: 0,
            wikipedia_url: '',
            hypoallergenic: 0,
            reference_image_id: '',
          },
        ],
        width: 0,
        height: 0,
      },
    });
  }
}
