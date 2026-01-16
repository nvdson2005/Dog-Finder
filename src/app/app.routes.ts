import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@pages/main-page/main-page'),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('@components/breed-image/breed-image').then(m => m.BreedImageComponent)
      }, {
        path: 'details',
        pathMatch: 'full',
        loadComponent: () => import('@components/breed-detail/breed-detail').then(m => m.BreedDetailsComponent)
      }
    ]
  },
  // {
  //   path: 'detail',
  //   pathMatch: 'full',
  //   loadComponent: () => import('@pages/detail-page/detail-page')
  // }
];
