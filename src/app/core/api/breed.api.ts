import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.httpClient.get<ApiBreedImage[]>(apiUrl.toString());
  }

  fetchBreedDetail(id: string) {
    const apiUrl = new URL(`/v1/images/${id}`, this.baseUrl);
    return this.httpClient.get<ApiBreedImage>(apiUrl.toString()).pipe(mapApiToBreed);
  }

  addToFavorites(breedId: string) {
    const apiUrl = new URL('/v1/favourites', this.baseUrl);
    const body = {
      image_id: breedId,
      sub_id: environment.USER_ID,
    };
    return this.httpClient.post(apiUrl.toString(), body);
  }

  getFavorites() {
    const apiUrl = new URL('/v1/favourites', this.baseUrl);
    apiUrl.search = new URLSearchParams({
      sub_id: environment.USER_ID,
    }).toString();
    return this.httpClient.get<FavoriteBreedResponse[]>(apiUrl.toString());
  }

  removeFromFavorites(favoriteId: number) {
    const apiUrl = new URL(`/v1/favourites/${favoriteId}`, this.baseUrl);
    return this.httpClient.delete(apiUrl.toString());
  }
}
