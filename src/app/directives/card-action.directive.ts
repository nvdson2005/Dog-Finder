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
      'w-full h-full text-white py-2 rounded-full cursor-pointer transition-colors duration-200 ';
    switch (this.appCardAction()) {
      case 'like':
        return baseClass + 'bg-green-500 hover:bg-green-700';
      case 'dislike':
        return baseClass + 'bg-blue-500 hover:bg-blue-700';
      default:
        return baseClass + 'bg-gray-500 hover:bg-gray-700';
    }
  });
  handleClick($event: Event) {
    $event.stopPropagation();
  }
}
