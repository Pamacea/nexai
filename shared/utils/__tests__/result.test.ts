import { describe, it, expect } from 'vitest';
import { ok, err, isOk, isErr, wrapAsync, wrapSync, type Result } from '../result';

describe('Result type', () => {
  describe('ok', () => {
    it('should create success result', () => {
      const result = ok('success');
      expect(result).toEqual({ success: true, data: 'success' });
    });

    it('should be identified by isOk', () => {
      const result = ok('success');
      expect(isOk(result)).toBe(true);
      expect(isErr(result)).toBe(false);
    });

    it('should provide type narrowing', () => {
      const result: Result<string> = ok('test');
      if (isOk(result)) {
        expect(result.data).toBe('test');
      }
    });
  });

  describe('err', () => {
    it('should create error result', () => {
      const error = new Error('fail');
      const result = err(error);
      expect(result).toEqual({ success: false, error });
    });

    it('should be identified by isErr', () => {
      const error = new Error('fail');
      const result = err(error);
      expect(isErr(result)).toBe(true);
      expect(isOk(result)).toBe(false);
    });

    it('should provide type narrowing', () => {
      const error = new Error('fail');
      const result: Result<never, Error> = err(error);
      if (isErr(result)) {
        expect(result.error.message).toBe('fail');
      }
    });
  });

  describe('wrapSync', () => {
    it('should wrap successful sync operation', () => {
      const result = wrapSync(() => 'success');
      expect(isOk(result)).toBe(true);
      if (isOk(result)) {
        expect(result.data).toBe('success');
      }
    });

    it('should wrap failed sync operation', () => {
      const result = wrapSync(() => {
        throw new Error('sync error');
      });
      expect(isErr(result)).toBe(true);
      if (isErr(result)) {
        expect(result.error.message).toBe('sync error');
      }
    });

    it('should handle return values', () => {
      const result = wrapSync(() => 42);
      expect(isOk(result)).toBe(true);
      if (isOk(result)) {
        expect(result.data).toBe(42);
      }
    });
  });

  describe('wrapAsync', () => {
    it('should wrap successful async operation', async () => {
      const result = await wrapAsync(async () => 'async success');
      expect(isOk(result)).toBe(true);
      if (isOk(result)) {
        expect(result.data).toBe('async success');
      }
    });

    it('should wrap failed async operation', async () => {
      const result = await wrapAsync(async () => {
        throw new Error('async error');
      });
      expect(isErr(result)).toBe(true);
      if (isErr(result)) {
        expect(result.error.message).toBe('async error');
      }
    });
  });

  describe('type narrowing examples', () => {
    it('should correctly narrow success type', () => {
      const result: Result<string, Error> = ok('test');
      if (isOk(result)) {
        expect(typeof result.data).toBe('string');
      }
    });

    it('should correctly narrow error type', () => {
      const error = new Error('test');
      const result: Result<string, Error> = err(error);
      if (isErr(result)) {
        expect(result.error).toBeInstanceOf(Error);
      }
    });
  });
});
