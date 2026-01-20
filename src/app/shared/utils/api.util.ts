import { ApiBreedImage, Breed } from '@type/breed';
export const mapApiToBreed = (img: ApiBreedImage): Breed | null => {
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
};
