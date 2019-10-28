import { isBlankOrEmpty, isIncludeBlank } from './';

describe('utility functions', () => {
  describe('isBlankOrEmpty', () => {
    it('should return true when blank', () => {
      const actual = isBlankOrEmpty(' ');
      expect(actual).toBeTruthy();
    });

    it('should return true when multibyte blank', () => {
      const actual = isBlankOrEmpty('　');
      expect(actual).toBeTruthy();
    });

    it('should return true when empty', () => {
      const actual = isBlankOrEmpty('');
      expect(actual).toBeTruthy();
    });

    it('should return false when not blank', () => {
      const actual = isBlankOrEmpty('a');
      expect(actual).toBeFalsy();
    });
  });

  describe('isIncludeBlank', () => {
    it('should return true when blank', () => {
      const actual = isIncludeBlank('a ');
      expect(actual).toBeTruthy();
    });

    it('should return true when multibyte blank', () => {
      const actual = isIncludeBlank('a　');
      expect(actual).toBeTruthy();
    });

    it('should return false when not blank', () => {
      const actual = isIncludeBlank('aa');
      expect(actual).toBeFalsy();
    });
  });
});
