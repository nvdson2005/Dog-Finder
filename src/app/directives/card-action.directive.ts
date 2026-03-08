import { computed, Directive, input } from '@angular/core';
import { CardActionType } from '@type/card';

@Directive({
  selector: '[appCardAction]',
  host: {
    '(click)': 'handleClick($event)',
    '[class]': 'colorClass()',
  },
})
export class CardActionDirective {
  readonly appCardAction = input<CardActionType>();
  readonly colorClass = computed(() => {
    const baseClass =
      'w-full h-full py-2 rounded-full cursor-pointer hover:scale-110 transition-transform duration-100';
    switch (this.appCardAction()) {
      case 'like':
        return baseClass + ' font-bold ' + 'text-slate-100 bg-primary';
      case 'dislike':
        return baseClass + ' font-bold ' + 'text-text bg-primary-light';
      default:
        return baseClass + ' font-bold ' + 'bg-gray-500 hover:bg-gray-700';
    }
  });
  handleClick($event: Event) {
    $event.stopPropagation();
  }
}
