import { Directive, input, Input, output } from '@angular/core';
import { CardActionType } from '../types/card-action-type';

@Directive({
  selector: '[appCardAction]',
  host: {
    '(click)': 'handleClick()',
  }
})
export class CardAction {
  readonly appCardAction = input<CardActionType>();
  handleClick() {
    console.log(`Card action triggered: ${this.appCardAction()}`);
  }
}
