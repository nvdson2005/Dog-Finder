import { Routes } from '@angular/router';
import { quitGuard } from './guards/quit-guard';
import { InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiBreedImage } from '@type/breed';

export const BREED_COUNT = new InjectionToken<BehaviorSubject<ApiBreedImage[]>>('BREED_COUNT');

export const routes: Routes = [
  {
    path: '',
    providers: [
      {
        provide: BREED_COUNT,
        useFactory: () => new BehaviorSubject<ApiBreedImage[]>([]),
      },
    ],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('@pages/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: '',
        loadComponent: () => import('@pages/main-page/main-page').then((m) => m.MainPage),
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () =>
              import('@pages/breed-image/breed-image').then((m) => m.BreedImageComponent),
          },
          {
            path: ':breedId',
            pathMatch: 'full',
            loadComponent: () =>
              import('@pages/breed-detail/breed-detail').then((m) => m.BreedDetailsComponent),
          },
        ],
        canDeactivate: [quitGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
