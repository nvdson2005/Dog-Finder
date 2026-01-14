interface IBreed {
  breedName: string;
  breedFor: string;
  breedGroup: string;
  weight: string;
  height: string;
  lifeSpan: string;
  temperament: string;
  imageUrl: string;
  [Symbol.iterator]?: () => IterableIterator<[string, any]>;
}

export type Breed = IBreed;
