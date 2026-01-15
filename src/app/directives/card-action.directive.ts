import { computed, Directive, input, Input, output } from '@angular/core';
import { CardActionType } from '../types/card-action-type';

@Directive({
  selector: '[appCardAction]',
  host: {
    '(click)': 'handleClick()',
    '[class]': 'colorClass()',
  }
})
export class CardActionDirective {
  readonly appCardAction = input<CardActionType>();
  handleClick() {
    // console.log(`Card action triggered: ${this.appCardAction()}`);
  }
  readonly colorClass = computed(() => {
    const baseClass = 'w-full h-full text-white py-2 rounded-full cursor-pointer transition-colors duration-200 ';
    switch (this.appCardAction()) {
      case 'like':
        return baseClass + 'bg-green-500 hover:bg-green-700';
      case 'dislike':
        return baseClass + 'bg-blue-500 hover:bg-blue-700';
      default:
        return baseClass + 'bg-gray-500 hover:bg-gray-700';
    }
  })
}
