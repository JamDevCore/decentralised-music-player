import {checkCID} from '../modules/find-music';


describe('Validate CIDs vs queries', () => {
  it('Returns true for QmP8GUBMJm9fGt9SWyhXR32PX9fM6VFFEYdRGFMPqBRhei', () => {
    expect(checkCID('QmP8GUBMJm9fGt9SWyhXR32PX9fM6VFFEYdRGFMPqBRhei')).toBe(true);
  });
  it('Returns true for QmaznTRBCxBXmDiVvezWTFJpQ9128TaWTag4Z4CoXkdogG', () => {
    expect(checkCID('QmaznTRBCxBXmDiVvezWTFJpQ9128TaWTag4Z4CoXkdogG')).toBe(true);
  });
  it('Returns true for Qmb6LYU3vG6yxbcVzV5gcDDB9u19qTGwdhBqyGqmM8AZRL', () => {
    expect(checkCID('Qmb6LYU3vG6yxbcVzV5gcDDB9u19qTGwdhBqyGqmM8AZRL')).toBe(true);
  });
  it('Returns true for QmZSmx3MRoKpiny3wR3EEkBi368KpeeBjLW7TNhU23Cu7o', () => {
    expect(checkCID('QmZSmx3MRoKpiny3wR3EEkBi368KpeeBjLW7TNhU23Cu7o')).toBe(true);
  });
  it('Returns false for hello', () => {
    expect(checkCID('hello')).toBe(false);
  });
  it('Returns false for djopqwjdqwjq', () => {
    expect(checkCID('djopqwjdqwjq')).toBe(false);
  });
  it('Returns false for Qmb6LYU3vG6y', () => {
    expect(checkCID('Qmb6LYU3vG6y')).toBe(false);
  });
});