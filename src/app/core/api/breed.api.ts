import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError, map, tap } from 'rxjs';
import { ApiBreedImage } from '@type/breed';
import { environment } from 'src/environments/environment.development';
import { mapApiToBreed } from '@shared/utils/api.util';
@Injectable()
export class BreedApiService {
  private readonly httpClient = inject(HttpClient);
  fetchBreedInfo(limit = 10, page = 1) {
    const baseUrl = environment.BASE_URL;
    const apiUrl = new URL('/v1/images/search', baseUrl);
    apiUrl.search = new URLSearchParams({
      limit: limit.toString(),
      page: page.toString(),
    }).toString();
    return this.httpClient.get<ApiBreedImage[]>(apiUrl.toString()).pipe(
      catchError(
        (error) => {
          console.error('Error fetching breed info:', error);
          return throwError(() => new Error('Failed to fetch breed info'));
        }
        // map((breedData) => {
        //   return this.httpClient.get<ApiBreedImage>(
        //     `https://api.thecatapi.com/v1/images/${breedData.id}`
        //   );
        // })
        // switchMap((data) => {
        //   data.map((item) => console.log(item));
        //   return this.httpClient.get<ApiBreedImage>(
        //     `https://api.thecatapi.com/v1/images/${data[0].id}`
        //   );
        // }),
        // map((breedData) => {
        //   return mapApiToBreed(breedData);
        // })
      )
    );
  }

  fetchBreedDetail(id: string) {
    const baseUrl = environment.BASE_URL;
    const apiUrl = new URL(`/v1/images/${id}`, baseUrl);
    return this.httpClient.get<ApiBreedImage>(apiUrl.toString()).pipe(
      map((breedData) => {
        // return this.breedApiPipe.transform(breedData);
        return mapApiToBreed(breedData);
      }),
      catchError(
        (error) => {
          console.error('Error fetching breed info:', error);
          return throwError(() => new Error('Failed to fetch breed info'));
        }
        // map((breedData) => {
        //   return this.httpClient.get<ApiBreedImage>(
        //     `https://api.thecatapi.com/v1/images/${breedData.id}`
        //   );
        // })
        // switchMap((data) => {
        //   data.map((item) => console.log(item));
        //   return this.httpClient.get<ApiBreedImage>(
        //     `https://api.thecatapi.com/v1/images/${data[0].id}`
        //   );
        // }),
      )
    );
  }

}
