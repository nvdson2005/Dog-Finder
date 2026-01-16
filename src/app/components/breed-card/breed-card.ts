import { Component, InjectionToken, input, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardActionDirective } from '@directives/card-action.directive';
import { Breed } from '@type/breed';
import { CardActionType } from '@type/card';

interface BreadInfo {
  readonly breed: Signal<Breed>;
}

const BREED_INFO = new InjectionToken<BreadInfo>('BREED_INFO');
@Component({
  selector: 'app-breed-card',
  imports: [CardActionDirective, RouterOutlet],
  providers: [
    {
      provide: BREED_INFO,
      useExisting: BreedCard,
    },
  ],
  template: `
    <div class="w-120 h-160 p-2 bg-slate-500 flex flex-col items-center justify-center">
      <div class="w-full flex-4/5 bg-blue-100 relative overflow-hidden">
        <router-outlet [routerOutletData]="breed()" />
      </div>
      <div class="w-full flex-1/5">
        <div class="w-full h-full flex py-3 items-center justify-between gap-56 px-4">
          <button [appCardAction]="'dislike'">Dislike</button>
          <button [appCardAction]="'like'">Like</button>
        </div>
      </div>
    </div>
  `,
})
class BreedCard implements BreadInfo {
  readonly cardAction = input<CardActionType>('idle');
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
}
export default BreedCard;
