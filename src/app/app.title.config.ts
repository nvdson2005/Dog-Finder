import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TitleStrategy } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AppTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  updateTitle(snapshot: RouterStateSnapshot): void {
    switch (snapshot.url) {
      case '/dashboard':
        this.title.setTitle('DogFinder - Dashboard');
        break;
      default:
        this.title.setTitle('DogFinder');
        break;
    }
  }
}
