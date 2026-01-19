import { Component, computed, effect, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { scan, switchMap } from 'rxjs';
import { BreedApiService } from '@core/api/breed.api';
import { RouterOutlet } from '@angular/router';
import { CardActionDirective } from '@directives/card-action.directive';
import { ApiBreedImage } from '@type/breed';
@Component({
  selector: 'app-main-page',
  imports: [RouterOutlet, CardActionDirective],
  providers: [BreedApiService],
  template: `
    <div class="w-screen h-screen flex items-center justify-center">
      <div class="w-120 h-160 p-2 bg-slate-500 flex flex-col items-center justify-center">
        <div class="w-full flex-4/5 bg-blue-100 relative ">
          <div class="absolute w-full h-full overflow-hidden">
            <router-outlet [routerOutletData]="currentDog()" />
          </div>
        </div>
        <div class="w-full flex-1/5">
          <div class="w-full h-full flex py-3 items-center justify-between gap-56 px-4">
            <button (click)="nextDog()" [appCardAction]="'dislike'">Dislike</button>
            <button (click)="nextDog()" [appCardAction]="'like'">Like</button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class MainPage {
  private readonly breedApiService = inject(BreedApiService);

  private readonly currentPage = signal(1);
  private currentIndex = signal(0);

  private infoPerPage = 10;

  readonly currentPage$ = toObservable(this.currentPage);
  readonly dogList$ = this.currentPage$.pipe(
    switchMap((page) => this.breedApiService.fetchBreedInfo(this.infoPerPage, page)),
    scan((allDogs, newDogs) => [...allDogs, ...newDogs], [] as ApiBreedImage[])
  );
  readonly dogList = toSignal(this.dogList$, { initialValue: [] });

  readonly currentDog = computed(() => {
    const currentIndex = this.currentIndex();
    return this.dogList()[currentIndex];
  });

  readonly _watchCurrentIndexChange = effect(() => {
    if(this.infoPerPage * this.currentPage() - this.currentIndex() <= 3) {
      this.currentPage.update((page) => page + 1);
    }
  });

  nextDog() {
    this.currentIndex.update((index) => index + 1);
    // if(this.dogList().length - this.currentIndex() <= 3) {
    //   this.currentPage.update((page) => page + 1);
    //   console.log('Fetching next page:', this.currentPage());
    //   this.currentIndex.set(0);
    //   this.infoPerPage  = 7;
    // }
  }
}
