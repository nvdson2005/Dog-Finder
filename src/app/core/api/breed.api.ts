import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError, map } from 'rxjs';
import { ApiBreedImage } from '@type/breed';
import { mapApiToBreed } from '@shared/utils/api.util';
import { BASE_API_URL } from './api.token';
@Injectable()
export class BreedApiService {
  private readonly baseUrl = inject(BASE_API_URL);

  private readonly httpClient = inject(HttpClient);
  fetchBreedInfo(limit = 10, page = 1) {
    const apiUrl = new URL('/v1/images/search', this.baseUrl);
    apiUrl.search = new URLSearchParams({
      limit: limit.toString(),
      page: page.toString(),
    }).toString();
    return this.httpClient.get<ApiBreedImage[]>(apiUrl.toString()).pipe(
      catchError((error) => {
        console.error('Error fetching breed info:', error);
        return throwError(() => new Error('Failed to fetch breed info'));
      }),
    );
  }

  fetchBreedDetail(id: string) {
    const apiUrl = new URL(`/v1/images/${id}`, this.baseUrl);
    return this.httpClient.get<ApiBreedImage>(apiUrl.toString()).pipe(
      map((breedData) => {
        return mapApiToBreed(breedData);
      }),
      catchError((error) => {
        console.error('Error fetching breed info:', error);
        return throwError(() => new Error('Failed to fetch breed info'));
      }),
    );
  }
}
