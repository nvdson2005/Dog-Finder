import { FavoriteBreedResponse } from '@type/breed';
import { Directive } from '@angular/core';

export type BreedContext = {
  $implicit: FavoriteBreedResponse[];
};

@Directive({
  selector: '[appLikedBreedsTab]',
})
export class LikedBreedsTabDirective {
  static ngTemplateContextGuard(dir: LikedBreedsTabDirective, ctx: unknown): ctx is BreedContext {
    return true;
  }
}
