import { describe, it, expect } from 'vitest';
import { artifactSchema, genreNodeSchema, slotFilterSchema } from '../artifact.schema';

describe('artifactSchema', () => {
  const validArtifact = {
    id: '1',
    name: 'The Useless Web',
    url: 'https://theuselessweb.com',
    lore: 'A powerful curse that transports the bearer to random useless domains.',
    slot: 'inutile' as const,
    itemType: 'weapon' as const,
    rarity: 'legendary' as const,
    durability: 2012,
    genre: 'metal' as const,
  };

  describe('valid data', () => {
    it('should accept valid artifact', () => {
      const result = artifactSchema.safeParse(validArtifact);
      expect(result.success).toBe(true);
    });

    it('should accept all valid slot values', () => {
      ['utile', 'nawak', 'inutile'].forEach(slot => {
        const result = artifactSchema.safeParse({ ...validArtifact, slot });
        expect(result.success).toBe(true);
      });
    });

    it('should accept all valid itemType values', () => {
      ['weapon', 'armor', 'accessory', 'relic'].forEach(itemType => {
        const result = artifactSchema.safeParse({ ...validArtifact, itemType });
        expect(result.success).toBe(true);
      });
    });

    it('should accept all valid rarity values', () => {
      ['legendary', 'epic', 'rare'].forEach(rarity => {
        const result = artifactSchema.safeParse({ ...validArtifact, rarity });
        expect(result.success).toBe(true);
      });
    });

    it('should accept all valid genre values', () => {
      ['metal', 'rock', 'blues', 'classical'].forEach(genre => {
        const result = artifactSchema.safeParse({ ...validArtifact, genre });
        expect(result.success).toBe(true);
      });
    });
  });

  describe('invalid data', () => {
    it('should reject empty id', () => {
      const result = artifactSchema.safeParse({ ...validArtifact, id: '' });
      expect(result.success).toBe(false);
    });

    it('should reject name exceeding max length', () => {
      const result = artifactSchema.safeParse({
        ...validArtifact,
        name: 'a'.repeat(201)
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid URL', () => {
      const result = artifactSchema.safeParse({
        ...validArtifact,
        url: 'not-a-url'
      });
      expect(result.success).toBe(false);
    });

    it('should reject lore exceeding max length', () => {
      const result = artifactSchema.safeParse({
        ...validArtifact,
        lore: 'a'.repeat(1001)
      });
      expect(result.success).toBe(false);
    });

    it('should reject negative durability', () => {
      const result = artifactSchema.safeParse({
        ...validArtifact,
        durability: -1
      });
      expect(result.success).toBe(false);
    });

    it('should reject durability exceeding max value', () => {
      const result = artifactSchema.safeParse({
        ...validArtifact,
        durability: 10000
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid slot', () => {
      const result = artifactSchema.safeParse({
        ...validArtifact,
        slot: 'invalid'
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid itemType', () => {
      const result = artifactSchema.safeParse({
        ...validArtifact,
        itemType: 'invalid'
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid rarity', () => {
      const result = artifactSchema.safeParse({
        ...validArtifact,
        rarity: 'common'
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid genre', () => {
      const result = artifactSchema.safeParse({
        ...validArtifact,
        genre: 'jazz'
      });
      expect(result.success).toBe(false);
    });
  });
});

describe('genreNodeSchema', () => {
  it('should accept valid genre node', () => {
    const result = genreNodeSchema.safeParse({
      id: 'metal',
      name: 'METAL',
      symbol: '[X]'
    });
    expect(result.success).toBe(true);
  });

  it('should reject missing fields', () => {
    const result = genreNodeSchema.safeParse({
      id: 'metal',
      name: 'METAL'
    });
    expect(result.success).toBe(false);
  });
});

describe('slotFilterSchema', () => {
  it('should accept valid slot filter', () => {
    const result = slotFilterSchema.safeParse({
      id: 'utile',
      name: 'UTILE'
    });
    expect(result.success).toBe(true);
  });

  it('should reject missing fields', () => {
    const result = slotFilterSchema.safeParse({
      id: 'utile'
    });
    expect(result.success).toBe(false);
  });
});
