import { Routes } from '@angular/router';
import { quitGuard } from './guards/quit-guard';
import { BASE_API_URL } from '@core/api/api.token';
import { environment } from '@environments/environment.development';

export const routes: Routes = [
  {
    path: '',
    providers: [
      {
        provide: BASE_API_URL,
        useValue: environment.BASE_DOG_URL,
      }
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
