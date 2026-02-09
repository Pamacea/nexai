import { describe, it, expect } from 'vitest';
import { siteSchema } from '../site.schema';

describe('siteSchema', () => {
  const validSite = {
    id: '1',
    name: 'Void Protocol',
    description: 'Expérience immersive dans le vide numérique.',
    url: 'https://void.protocol',
    category: 'design' as const,
    image: '/images/void-protocol.jpg',
    tags: ['brutalism', 'immersive', 'dark']
  };

  describe('valid data', () => {
    it('should accept valid site', () => {
      const result = siteSchema.safeParse(validSite);
      expect(result.success).toBe(true);
    });

    it('should accept all valid category values', () => {
      ['design', 'saas', 'ecommerce', 'portfolio'].forEach(category => {
        const result = siteSchema.safeParse({ ...validSite, category });
        expect(result.success).toBe(true);
      });
    });

    it('should accept valid tags array', () => {
      const result = siteSchema.safeParse({
        ...validSite,
        tags: ['design', 'minimal']
      });
      expect(result.success).toBe(true);
    });

    it('should accept single tag', () => {
      const result = siteSchema.safeParse({
        ...validSite,
        tags: ['design']
      });
      expect(result.success).toBe(true);
    });

    it('should accept maximum 10 tags', () => {
      const result = siteSchema.safeParse({
        ...validSite,
        tags: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
      });
      expect(result.success).toBe(true);
    });
  });

  describe('invalid data', () => {
    it('should reject empty id', () => {
      const result = siteSchema.safeParse({ ...validSite, id: '' });
      expect(result.success).toBe(false);
    });

    it('should reject name exceeding max length', () => {
      const result = siteSchema.safeParse({
        ...validSite,
        name: 'a'.repeat(201)
      });
      expect(result.success).toBe(false);
    });

    it('should reject description exceeding max length', () => {
      const result = siteSchema.safeParse({
        ...validSite,
        description: 'a'.repeat(501)
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid URL', () => {
      const result = siteSchema.safeParse({
        ...validSite,
        url: 'not-a-url'
      });
      expect(result.success).toBe(false);
    });

    it('should reject empty image', () => {
      const result = siteSchema.safeParse({
        ...validSite,
        image: ''
      });
      expect(result.success).toBe(false);
    });

    it('should reject empty tags array', () => {
      const result = siteSchema.safeParse({
        ...validSite,
        tags: []
      });
      expect(result.success).toBe(false);
    });

    it('should reject tags exceeding 10 items', () => {
      const result = siteSchema.safeParse({
        ...validSite,
        tags: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
      });
      expect(result.success).toBe(false);
    });

    it('should reject empty string in tags', () => {
      const result = siteSchema.safeParse({
        ...validSite,
        tags: ['design', '']
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid category', () => {
      const result = siteSchema.safeParse({
        ...validSite,
        category: 'blog'
      });
      expect(result.success).toBe(false);
    });
  });
});
