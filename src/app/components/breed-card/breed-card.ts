import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardActionDirective } from '@directives/card-action.directive';
// import { fetchBreedInfo } from 'src/app/core/api/breed.api';
import { BreedApiService } from '@core/api/breed.api';
import { AsyncPipe } from '@angular/common';
import { startWith, Subject, switchMap } from 'rxjs';
@Component({
  selector: 'app-breed-card',
  imports: [CardActionDirective, RouterOutlet, AsyncPipe],
  providers: [BreedApiService],
  template: `
    <div class="w-120 h-160 p-2 bg-slate-500 flex flex-col items-center justify-center">
      <div class="w-full flex-4/5 bg-blue-100 relative ">
        <div class="absolute w-full h-full overflow-hidden">
          @if (breedInfo$ | async; as breedData) {
          <router-outlet [routerOutletData]="breedData" />
          }
        </div>
      </div>
      <div class="w-full flex-1/5">
        <div class="w-full h-full flex py-3 items-center justify-between gap-56 px-4">
          <button (click)="refresh()" [appCardAction]="'dislike'">Dislike</button>
          <button (click)="refresh()" [appCardAction]="'like'">Like</button>
        </div>
      </div>
    </div>
  `,
})
class BreedCard {
  private readonly refresh$ = new Subject<void>();
  private readonly breedApiService = inject(BreedApiService);
  readonly breedInfo$ = this.refresh$.pipe(
    startWith(void 0),
    switchMap(() => this.breedApiService.fetchBreedInfo())
  );
  refresh() {
    this.refresh$.next();
  }
}
export default BreedCard;
