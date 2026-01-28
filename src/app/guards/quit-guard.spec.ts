import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { quitGuard } from './quit-guard';
import { MainPage } from '@pages/main-page/main-page';

describe('quitGuard', () => {
  const executeGuard: CanDeactivateFn<MainPage> = quitGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
