import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'breedApi',
  standalone: true,
})
export class BreedApiPipe implements PipeTransform {
  transform(value: string | undefined | null): string {
    if (!value || value.length === 0) {
      return 'No information';
    }
    return value;
  }
}
