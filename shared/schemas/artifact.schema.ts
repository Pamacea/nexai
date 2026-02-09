import { z } from 'zod';

export const slotSchema = z.enum(['utile', 'nawak', 'inutile']);
export const itemTypeSchema = z.enum(['weapon', 'armor', 'accessory', 'relic']);
export const raritySchema = z.enum(['legendary', 'epic', 'rare']);
export const genreSchema = z.enum(['metal', 'rock', 'blues', 'classical']);

export const artifactSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(200),
  url: z.string().url(),
  lore: z.string().min(1).max(1000),
  slot: slotSchema,
  itemType: itemTypeSchema,
  rarity: raritySchema,
  durability: z.number().int().positive().max(9999),
  genre: genreSchema,
});

export type ArtifactInput = z.infer<typeof artifactSchema>;
export type Slot = z.infer<typeof slotSchema>;
export type ItemType = z.infer<typeof itemTypeSchema>;
export type Rarity = z.infer<typeof raritySchema>;
export type Genre = z.infer<typeof genreSchema>;

export const genreNodeSchema = z.object({
  id: z.string(),
  name: z.string(),
  symbol: z.string(),
});

export const slotFilterSchema = z.object({
  id: z.string(),
  name: z.string(),
});
