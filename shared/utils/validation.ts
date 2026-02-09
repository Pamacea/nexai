import { z } from 'zod';
import type { Result } from './result';
import { ok, err } from './result';

export function validate<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): Result<T, z.ZodError> {
  const result = schema.safeParse(data);
  if (result.success) {
    return ok(result.data) as Result<T, z.ZodError>;
  }
  return err(result.error);
}

export function validateOrThrow<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): T {
  return schema.parse(data);
}

export function validateArray<T>(
  schema: z.ZodSchema<T>,
  data: unknown[]
): Result<T[], z.ZodError> {
  const results = data.map(item => schema.safeParse(item));
  const errors = results.filter(r => !r.success);

  if (errors.length > 0) {
    return err(errors[0]!.error);
  }

  return ok(results.map(r => (r as z.ZodSafeParseSuccess<T>).data)) as Result<T[], z.ZodError>;
}
