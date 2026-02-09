import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { validate, validateOrThrow, validateArray } from '../validation';

const testSchema = z.object({
  name: z.string().min(1),
  age: z.number().positive(),
});

describe('validate', () => {
  it('should return ok result for valid data', () => {
    const result = validate(testSchema, { name: 'John', age: 30 });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual({ name: 'John', age: 30 });
    }
  });

  it('should return err result for invalid data', () => {
    const result = validate(testSchema, { name: '', age: -1 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBeInstanceOf(z.ZodError);
    }
  });

  it('should handle type errors', () => {
    const result = validate(testSchema, { name: 'John', age: '30' });
    expect(result.success).toBe(false);
  });

  it('should handle missing fields', () => {
    const result = validate(testSchema, { name: 'John' });
    expect(result.success).toBe(false);
  });
});

describe('validateOrThrow', () => {
  it('should return validated data for valid input', () => {
    const data = validateOrThrow(testSchema, { name: 'John', age: 30 });
    expect(data).toEqual({ name: 'John', age: 30 });
  });

  it('should throw ZodError for invalid input', () => {
    expect(() => {
      validateOrThrow(testSchema, { name: '', age: -1 });
    }).toThrow(z.ZodError);
  });

  it('should include error details in thrown error', () => {
    try {
      validateOrThrow(testSchema, { name: '', age: -1 });
      expect.fail('Should have thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(z.ZodError);
      if (error instanceof z.ZodError) {
        expect(error.issues.length).toBeGreaterThan(0);
      }
    }
  });
});

describe('validateArray', () => {
  const items = [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 },
    { name: 'Bob', age: 35 },
  ];

  it('should validate all items in array', () => {
    const result = validateArray(testSchema, items);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toHaveLength(3);
      expect(result.data[0]).toEqual({ name: 'John', age: 30 });
    }
  });

  it('should return err for first invalid item', () => {
    const invalidItems = [
      { name: 'John', age: 30 },
      { name: '', age: -1 },
      { name: 'Bob', age: 35 },
    ];
    const result = validateArray(testSchema, invalidItems);
    expect(result.success).toBe(false);
  });

  it('should handle empty array', () => {
    const result = validateArray(testSchema, []);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual([]);
    }
  });

  it('should handle single item array', () => {
    const result = validateArray(testSchema, [{ name: 'John', age: 30 }]);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toHaveLength(1);
    }
  });
});
