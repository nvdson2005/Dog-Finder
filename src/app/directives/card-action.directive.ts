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
      'w-full h-full py-2 rounded-full cursor-pointer transition-colors duration-200 ';
    switch (this.appCardAction()) {
      case 'like':
        return baseClass + 'text-white bg-primary hover:bg-primary';
      case 'dislike':
        return baseClass + 'text-text bg-primary-light hover:bg-primary';
      default:
        return baseClass + 'bg-gray-500 hover:bg-gray-700';
    }
  });
  handleClick($event: Event) {
    $event.stopPropagation();
  }
}
