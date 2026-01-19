import { ApiBreedImage, Breed } from '@type/breed';
export const mapApiToBreed = (img: ApiBreedImage): Breed | null => {
  const breed = img.breeds?.[0];
  if (!breed)
    return {
      id: img.id,
      breedName: 'Unknown',
      breedFor: 'Unknown',
      breedGroup: 'Unknown',
      weight: 'Unknown',
      height: 'Unknown',
      lifeSpan: 'Unknown',
      temperament: 'Unknown',
      url: img.url,
    };
  return {
    id: breed.id,
    breedName: breed.name,
    temperament: breed.temperament,
    lifeSpan: breed.life_span,
    weight: breed.weight.imperial,
    height: 'N/A',
    breedFor: 'N/A',
    breedGroup: 'N/A',
    url: img.url,
  };
};
