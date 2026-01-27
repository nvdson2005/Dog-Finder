import { ApiBreedImage, Breed } from '@type/breed';
import { map, Observable } from 'rxjs';
export const mapApiToBreed = (img$: Observable<ApiBreedImage>): Observable<Breed | null> =>
  img$.pipe(
    map((img) => {
      {
        const breed = img.breeds?.[0];
        return {
          id: breed?.id,
          breedName: breed?.name,
          temperament: breed?.temperament,
          lifeSpan: breed?.life_span,
          weight: breed?.weight?.imperial,
          height: breed?.weight?.metric,
          breedFor: 'N/A',
          breedGroup: 'N/A',
          url: img.url,
        };
      }
    }),
  );
