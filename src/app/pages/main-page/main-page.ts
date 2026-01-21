import { Component, computed, inject, InjectionToken, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { scan, switchMap } from 'rxjs';
import { BreedApiService } from '@core/api/breed.api';
import { RouterOutlet } from '@angular/router';
import { CardActionDirective } from '@directives/card-action.directive';
import { ApiBreedImage } from '@type/breed';
import { Router, ActivatedRoute } from '@angular/router';
import { NavBar } from '@components/nav-bar/nav-bar';
import { BREED_COUNT } from 'src/app/app.routes';
@Component({
  selector: 'app-main-page',
  imports: [RouterOutlet, CardActionDirective, NavBar],
  providers: [BreedApiService],
  template: `
    <app-nav-bar></app-nav-bar>
    <div class="w-screen h-screen flex items-center justify-center">
      <div class="w-120 h-160 p-2 bg-slate-500 flex flex-col items-center justify-center">
        <div class="w-full flex-4/5 bg-blue-100 relative ">
          <div class="absolute w-full h-full overflow-hidden">
            <router-outlet [routerOutletData]="currentDog()" />
          </div>
        </div>
        <div class="w-full flex-1/5">
          <div class="w-full h-full flex py-3 items-center justify-between gap-56 px-4">
            <button (click)="nextDog(false)" [appCardAction]="'dislike'">Dislike</button>
            <button (click)="nextDog(true)" [appCardAction]="'like'">Like</button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class MainPage {
  private readonly breedCount = inject(BREED_COUNT);
  PAGE_SIZE = new InjectionToken<number>('PAGE_SIZE', {
    factory: () => 10,
  });

  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly breedApiService = inject(BreedApiService);

  private readonly currentIndex = signal(0);
  private readonly currentPage = computed(
    () => Math.floor(this.currentIndex() / this.infoPerPage) + 1,
  );

  private readonly infoPerPage = inject(this.PAGE_SIZE);

  readonly currentPage$ = toObservable(this.currentPage);
  readonly dogList$ = this.currentPage$.pipe(
    switchMap((page) => this.breedApiService.fetchBreedInfo(this.infoPerPage, page)),
    scan((allDogs, newDogs) => [...allDogs, ...newDogs], [] as ApiBreedImage[]),
  );
  readonly dogList = toSignal(this.dogList$, { initialValue: [] });

  readonly currentDog = computed(() => {
    const currentIndex = this.currentIndex();
    return this.dogList()[currentIndex];
  });

  nextDog(isLike = false) {
    if (isLike) {
      this.breedCount.next([...this.breedCount.getValue(), this.currentDog()]);
      console.log('Liked dog:', this.breedCount.getValue());
    }
    this.currentIndex.update((index) => index + 1);
    if (this.activatedRoute.firstChild?.snapshot.paramMap.get('breedId') != null) {
      this.router.navigate([this.currentDog().id]);
    }
  }
}
