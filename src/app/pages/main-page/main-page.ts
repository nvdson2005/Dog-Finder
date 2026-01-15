import { Component } from '@angular/core';
import BreedCard from '@components/breed-card/breed-card';
@Component({
  selector: 'app-main-page',
  imports: [BreedCard],
  template: `
    <div class="w-screen h-screen flex items-center justify-center">
      <div>
        <app-breed-card [showDetails]="false"></app-breed-card>
      </div>
    </div>
  `,
})
class MainPage {}
export default MainPage;
