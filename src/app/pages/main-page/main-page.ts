import { Component, computed, inject, InjectionToken, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { firstValueFrom, scan, Subject, switchMap } from 'rxjs';
import { BreedApiService } from '@core/api/breed.api';
import { RouterOutlet } from '@angular/router';
import { CardActionDirective } from '@directives/card-action.directive';
import { ApiBreedImage } from '@type/breed';
import { Router, ActivatedRoute } from '@angular/router';
import { NavBar } from '@components/nav-bar/nav-bar';

type CardState = 'like' | 'dislike' | 'none';
@Component({
  selector: 'app-main-page',
  imports: [RouterOutlet, CardActionDirective, NavBar],
  providers: [BreedApiService],
  template: `
    <app-nav-bar></app-nav-bar>
    <div class="w-screen h-screen flex items-center justify-center bg-surface">
      <div
        [class]="
          cardState() === 'like'
            ? 'animate-swipe-right'
            : cardState() === 'dislike'
              ? 'animate-swipe-left'
              : 'animate-scale-in'
        "
        class="w-120 h-160 p-2 bg-primary-super-light flex flex-col items-center justify-center rounded-2xl"
      >
        <div class="w-full flex-4/5 bg-surface relative rounded-2xl">
          <div class="absolute w-full h-full overflow-hidden rounded-2xl">
            <router-outlet [routerOutletData]="currentDog()" />
          </div>
        </div>
        <div class="w-full flex-1/5">
          <div class="w-full h-full flex py-3 items-center justify-between gap-56 px-4">
            <button (click)="nextDog(false)" [appCardAction]="'dislike'">Skip</button>
            <button (click)="nextDog(true)" [appCardAction]="'like'">Like</button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class MainPage {
  PAGE_SIZE = new InjectionToken<number>('PAGE_SIZE', {
    factory: () => 10,
  });

  protected readonly cardState$ = new Subject<CardState>();
  protected readonly cardState = toSignal(this.cardState$, { initialValue: 'none' });

  protected readonly router = inject(Router);
  protected readonly activatedRoute = inject(ActivatedRoute);
  protected readonly breedApiService = inject(BreedApiService);

  protected readonly currentIndex = signal(0);
  protected readonly favoriteResponse = signal<void>(undefined);

  protected readonly currentPage = computed(
    () => Math.floor(this.currentIndex() / this.infoPerPage) + 1,
  );

  private readonly infoPerPage = inject(this.PAGE_SIZE);

  protected readonly currentPage$ = toObservable(this.currentPage);
  protected readonly dogList$ = this.currentPage$.pipe(
    switchMap((page) => this.breedApiService.fetchBreedInfo(this.infoPerPage, page)),
    scan((allDogs, newDogs) => [...allDogs, ...newDogs], [] as ApiBreedImage[]),
  );
  protected readonly dogList = toSignal(this.dogList$, { initialValue: [] });

  protected readonly currentDog = computed(() => {
    const currentIndex = this.currentIndex();
    return this.dogList()[currentIndex];
  });

  async nextDog(isLike = false) {
    if (isLike) {
      this.cardState$.next('like');
      await firstValueFrom(this.breedApiService.addToFavorites(this.currentDog().id));
      this.favoriteResponse.update((_) => _);
    } else {
      this.cardState$.next('dislike');
    }
    this.currentIndex.update((index) => index + 1);
    if (this.activatedRoute.firstChild?.snapshot.paramMap.get('breedId') != null) {
      this.router.navigate([this.currentDog().id]);
    }
    await new Promise((resolve) => setTimeout(resolve, 700));
    this.cardState$.next('none');
  }
}
