import { Component, inject, signal } from '@angular/core';
import { NavBar } from '@components/nav-bar/nav-bar';
import { ApiBreedImage } from '@type/breed';
import { BREED_COUNT } from 'src/app/app.routes';
import { BreedApiPipe } from 'src/app/pipes/breed-api-pipe';
@Component({
  selector: 'app-dashboard',
  imports: [NavBar, BreedApiPipe],
  template: `
    <div class="w-screen h-screen bg-slate-200">
      <app-nav-bar></app-nav-bar>
      <div class="w-full h-full flex flex-col items-start pt-20 px-2">
        <h1 class="text-xl font-bold">
          Number of liked breeds: {{ breedCount.getValue().length }}
        </h1>
        <div class="mt-4 w-full grid-cols-4">
          @for (breed of breedCount.getValue(); track $index) {
            <button
              (click)="showDetails(breed)"
              class="w-40 h-40 m-2 p-2 bg-white rounded-lg shadow-md inline-block relative group"
            >
              <img
                class="w-full h-full object-cover rounded-lg"
                [src]="breed.url"
                [alt]="breed.breeds[0]?.name | breedApi"
              />
              <div
                class="absolute bottom-0 left-0 w-full bg-black/90 bg-opacity-50 text-white text-sm p-1 rounded-b-lg transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              >
                {{ breed.breeds[0]?.name ?? 'A cute unnamed dog' }}
              </div>
            </button>
          }
        </div>
      </div>
      @if (chosenBreed(); as breed) {
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 class="text-2xl font-bold mb-4">
              {{ breed!.breeds[0]?.name ?? 'A cute unnamed dog' }}
            </h2>
            <img
              class="w-full h-64 object-cover rounded-lg mb-4"
              [src]="breed!.url"
              [alt]="breed!.breeds[0]?.name ?? 'A cute unnamed dog' | breedApi"
            />
            <p><strong>Temperament:</strong> {{ breed!.breeds[0]?.temperament | breedApi }}</p>
            <p><strong>Life Span:</strong> {{ breed!.breeds[0]?.life_span | breedApi }}</p>
            <p><strong>Origin:</strong> {{ breed!.breeds[0]?.origin | breedApi }}</p>
            <button
              class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              (click)="chosenBreed.set(null)"
            >
              Close
            </button>
          </div>
        </div>
      }
    </div>
  `,
  styles: ``,
})
export class Dashboard {
  protected readonly breedCount = inject(BREED_COUNT);

  readonly chosenBreed = signal<ApiBreedImage | null>(null);

  showDetails(breed: ApiBreedImage) {
    this.chosenBreed.set(breed);
  }
}
