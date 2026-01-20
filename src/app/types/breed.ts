export type Breed = {
  id: string;
  breedName: string;
  breedFor: string;
  breedGroup: string;
  weight: string;
  height: string;
  lifeSpan: string;
  temperament: string;
  url: string;
};

export type ApiBreedWeight = {
  imperial: string;
  metric: string;
};

export type ApiBreed = {
  weight: ApiBreedWeight;
  id: string;
  name: string;
  temperament: string;
  origin: string;
  country_codes: string;
  country_code: string;
  description: string;
  life_span: string;
  indoor: number;
  lap: number;
  alt_names: string;
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  dog_friendly: number;
  energy_level: number;
  grooming: number;
  health_issues: number;
  intelligence: number;
  shedding_level: number;
  social_needs: number;
  stranger_friendly: number;
  vocalisation: number;
  experimental: number;
  hairless: number;
  natural: number;
  rare: number;
  rex: number;
  suppressed_tail: number;
  short_legs: number;
  wikipedia_url: string;
  hypoallergenic: number;
  reference_image_id: string;
};

export type ApiBreedImage = {
  id: string;
  url: string;
  breeds: ApiBreed[];
  width: number;
  height: number;
};
