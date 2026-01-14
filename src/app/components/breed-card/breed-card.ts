import { Component, input } from '@angular/core';
import { Breed } from 'src/app/types/breed';
@Component({
  selector: 'app-breed-card',
  imports: [],
  template: `
    <div class="w-120 h-160 p-2 bg-slate-500 flex flex-col items-center justify-center">
      <div class="w-full flex-4/5 bg-blue-100 relative overflow-hidden">
        @if (showDetails()) {
        <div class="w-full h-full text-black p-2 flex flex-col gap-4">
          <div class="w-full">
            <h6 class="text-2xl font-bold">Breed Name</h6>
            <p class="text-xl">{{ breed().breedName }}</p>
          </div>
          <div class="w-full">
            <h6 class="text-2xl font-bold">Breed For</h6>
            <p class="text-xl">{{ breed().breedFor }}</p>
          </div>
          <div class="w-full">
            <h6 class="text-2xl font-bold">Weight and Height</h6>
            <p class="text-xl">{{ breed().weight }} and {{ breed().height }}</p>
          </div>
          <div class="w-full">
            <h6 class="text-2xl font-bold">Breed Group</h6>
            <p class="text-xl">{{ breed().breedGroup }}</p>
          </div>
          <div class="w-full">
            <h6 class="text-2xl font-bold">Temperament</h6>
            <p class="text-xl">{{ breed().temperament }}</p>
          </div>
          <div class="w-full">
            <h6 class="text-2xl font-bold">Life Span</h6>
            <p class="text-xl">{{ breed().lifeSpan }}</p>
          </div>
        </div>
        } @else {
        <img [src]="breed().imageUrl" class="w-full object-cover" alt="Dog Breed" />
        <div class="absolute bottom-2 left-2 w-3/4 bg-black/90 bg-opacity-50 text-white p-2">
          <h2 class="text-lg font-bold">{{ breed().breedName }}</h2>
          <p class="text-sm">Breed For {{ breed().breedFor }}</p>
        </div>
        }
      </div>
      <div class="w-full flex-1/5">
        <div class="w-full h-full flex py-3 items-center justify-between gap-56 px-4">
          <button class="w-full h-full bg-blue-500 text-white py-2 rounded-full cursor-pointer">
            Dislike
          </button>
          <button
            class="w-full h-full bg-green-500 text-white py-2 rounded-full ml-2 cursor-pointer"
          >
            Like
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
class BreedCard {
  readonly breed = input<Breed>({
    breedName: 'Afghan Hound',
    breedFor: 'Coursing and hunting',
    breedGroup: 'Hound',
    weight: '50-60 lbs',
    height: '25-27 inches',
    lifeSpan: '10-13 years',
    temperament: 'Aloof, dignified, independent, sweet-natured',
    imageUrl: 'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg',
  });
  readonly showDetails = input(false);
}
export default BreedCard;
