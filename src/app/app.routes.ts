import { Routes } from '@angular/router';

export const routes: Routes = [
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
  },
];
