import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs';
import { ApiBreedImage } from '@type/breed';
import { mapApiToBreed } from 'src/app/shared/utils/api.util';

@Injectable()
export class BreedApiService {
  private readonly httpClient = inject(HttpClient);

  fetchBreedInfo() {
    return this.httpClient.get<ApiBreedImage[]>('https://api.thecatapi.com/v1/images/search').pipe(
      switchMap((data) => {
        return this.httpClient.get<ApiBreedImage>(
          `https://api.thecatapi.com/v1/images/${data[0].id}`
        );
      }),
      map((breedData) => {
        return mapApiToBreed(breedData);
      })
    );
  }
}
