import { Directive, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { CardType } from '@type/card'
@Directive({
  selector: '[appCardRoute]',
  host: {
    '(click)': 'onClick()',
  },
})
export class CardRouteDirective {
  private router = inject(Router);
  readonly cardType = input<CardType>('main');
  onClick() {
    if (this.cardType() === 'main') {
      console.log('Navigating to detail page');
      // this.router.navigate(['/detail']);
    } else {
      console.log('Navigating to main page');
      // this.router.navigate(['/']);
    }
  }
}
