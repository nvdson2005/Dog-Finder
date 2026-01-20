import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'breedApi',
  standalone: true,
})
export class BreedApiPipe implements PipeTransform {
  transform(value: string): string {
    if (!value || value.length === 0) {
      return 'unknown';
    }
    return value;
  }
}
