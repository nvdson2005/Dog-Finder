import { BreedApiPipe } from 'src/app/pipes/breed-api-pipe';
import { NgTemplateOutlet } from '@angular/common';
import { Component, output, TemplateRef } from '@angular/core';
import { computed, input, viewChild } from '@angular/core';
import { FavoriteBreedResponse } from '@type/breed';
import { LikedBreedsTabDirective, BreedContext } from './dashboard.directives';
@Component({
  imports: [BreedApiPipe, NgTemplateOutlet, LikedBreedsTabDirective],
  selector: 'app-dashboard-tab-container',
  template: `
    <ng-container
      [ngTemplateOutlet]="templateToShow()"
      [ngTemplateOutletContext]="{ $implicit: likedBreedsList() }"
      appLikedBreedsTab
    />
    <ng-template appLikedBreedsTab #likedBreeds let-breeds>
      <div class="w-full h-full flex flex-col items-start pt-20 px-2">
        <h1 class="text-xl font-bold">Number of liked breeds: {{ breeds.length }}</h1>
        <div class="mt-4 w-full grid grid-cols-7 gap-4 max-md:grid-cols-2 max-xl:grid-cols-5">
          @for (breed of breeds; track $index) {
            <div
              class="w-40 h-40 m-2 p-2 bg-white rounded-lg shadow-md inline-block relative group"
            >
              <button
                class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700 transition-colors duration-300  z-10 group-hover:opacity-100 opacity-0 max-sm:opacity-100"
                (click)="emitRemoveEvent(breed.id)"
              >
                &times;
              </button>
              <img
                class="w-full h-full object-cover rounded-lg"
                [src]="breed.image.url"
                [alt]="breed.image.breeds[0]?.name | breedApiPipe"
              />
              <div
                class="absolute flex items-center justify-center bottom-0 left-0 w-full bg-black/90 bg-opacity-50 text-white text-sm p-1 rounded-b-lg transition-opacity duration-300 opacity-0 group-hover:opacity-100 max-sm:opacity-100"
              >
                {{
                  breed.image.breeds[0]?.name && breed.image.breeds[0]?.name !== ''
                    ? breed.image.breeds[0]?.name
                    : 'A cute unnamed dog'
                }}
              </div>
            </div>
          }
        </div>
      </div>
    </ng-template>
    <ng-template #noLikedBreeds>
      <div class="w-full h-full flex items-center justify-center pt-20 px-2">
        <h1 class="text-xl font-bold">
          No liked breeds yet. Go to main page to find your favorite breeds.
        </h1>
      </div>
    </ng-template>
    <ng-template #loadingTemplate>
      <div class="w-full h-full flex items-center justify-center pt-20 px-2">
        <h1 class="text-xl font-bold">Loading your liked breeds...</h1>
      </div>
    </ng-template>
  `,
})
export class DashboardTabContainer {
  readonly isLoading = input(false);
  readonly likedBreedsList = input<FavoriteBreedResponse[] | null>(null);
  readonly breedRemoved = output<number>();

  private readonly likedBreedsTemplate =
    viewChild.required<TemplateRef<BreedContext>>('likedBreeds');
  private readonly noLikedBreedsTemplate =
    viewChild.required<TemplateRef<BreedContext>>('noLikedBreeds');
  private readonly loadingTemplate =
    viewChild.required<TemplateRef<BreedContext>>('loadingTemplate');

  readonly templateToShow = computed(() =>
    this.isLoading()
      ? this.loadingTemplate()
      : this.likedBreedsList() && this.likedBreedsList()!.length > 0
        ? this.likedBreedsTemplate()
        : this.noLikedBreedsTemplate(),
  );

  emitRemoveEvent(id: number) {
    this.breedRemoved.emit(id);
  }
}
