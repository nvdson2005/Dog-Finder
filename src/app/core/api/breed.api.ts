import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError, map } from 'rxjs';
import { ApiBreedImage, FavoriteBreedResponse } from '@type/breed';
import { mapApiToBreed } from '@shared/utils/api.util';
import { BASE_API_URL } from './api.token';
import { environment } from '@environments/environment.development';
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

  addToFavorites(breedId: string) {
    const apiUrl = new URL('/v1/favourites', this.baseUrl);
    const body = {
      image_id: breedId,
      sub_id: environment.USER_ID,
    };
    return this.httpClient.post(apiUrl.toString(), body).pipe(
      catchError((error) => {
        console.error('Error adding breed to favorites:', error);
        return throwError(() => new Error('Failed to add breed to favorites'));
      }),
    );
  }

  getFavorites() {
    const apiUrl = new URL('/v1/favourites', this.baseUrl);
    apiUrl.search = new URLSearchParams({
      sub_id: environment.USER_ID,
    }).toString();
    return this.httpClient.get<FavoriteBreedResponse[]>(apiUrl.toString()).pipe(
      catchError((error) => {
        console.error('Error fetching favorite breeds:', error);
        return throwError(() => new Error('Failed to fetch favorite breeds'));
      }),
    );
  }

  removeFromFavorites(favoriteId: number) {
    const apiUrl = new URL(`/v1/favourites/${favoriteId}`, this.baseUrl);
    return this.httpClient.delete(apiUrl.toString()).pipe(
      catchError((error) => {
        console.error('Error removing breed from favorites:', error);
        return throwError(() => new Error('Failed to remove breed from favorites'));
      }),
    );
  }
}
