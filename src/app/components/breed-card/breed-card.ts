import { Component } from '@angular/core';

@Component({
  selector: 'app-breed-card',
  imports: [],
  template: `
    <div class="w-120 h-160 p-2 bg-slate-500 flex flex-col items-center justify-center">
      <div class="w-full flex-4/5 bg-amber-300 relative overflow-hidden">
        <img class="w-full object-cover" src="https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg" alt="Dog Breed" />
        <div class="absolute bottom-2 left-2 w-3/4 bg-black/90 bg-opacity-50 text-white p-2">
          <h2 class="text-lg font-bold">Breed Name</h2>
          <p class="text-sm">Breed For</p>
        </div>
      </div>
      <div class="w-full flex-1/5">
        <div class="w-full h-full flex py-3 items-center justify-between gap-56 px-4">
          <button class="w-full h-full bg-blue-500 text-white py-2 rounded-full cursor-pointer">Dislike</button>
          <button class="w-full h-full bg-green-500 text-white py-2 rounded-full ml-2 cursor-pointer">Like</button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
class BreedCard {}
export default BreedCard;
