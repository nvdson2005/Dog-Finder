import { BreedApiPipe } from './breed-api-pipe';

describe('BreedApiPipe', () => {
  it('create an instance', () => {
    const pipe = new BreedApiPipe();
    expect(pipe).toBeTruthy();
  });

  it('keep values unchanged if value exists', () => {
    const pipe = new BreedApiPipe();
    expect(pipe.transform('German Shepherd')).toBe('German Shepherd');
    expect(pipe.transform('Golden Retriever')).toBe('Golden Retriever');
    expect(pipe.transform('Bulldog')).toBe('Bulldog');
  });

  it('return "No information" for null, undefined or empty string', () => {
    const pipe = new BreedApiPipe();
    expect(pipe.transform(null)).toBe('No information');
    expect(pipe.transform(undefined)).toBe('No information');
    expect(pipe.transform('')).toBe('No information');
  });
});
