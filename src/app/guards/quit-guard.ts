import { CanDeactivateFn } from '@angular/router';
import { MainPage } from '@pages/main-page/main-page';

export const quitGuard: CanDeactivateFn<MainPage> = () =>
  confirm('Are you sure you want to quit? Unsaved changes may be lost.');
