import { artifacts, genreNodes, slotFilters, rarityOrder, itemTypeLabels } from './data';
import { artifactSchema, genreNodeSchema, slotFilterSchema } from '@/shared/schemas';
import { validateOrThrow } from '@/shared/utils';

export const validatedArtifacts = artifacts.map(artifact =>
  validateOrThrow(artifactSchema, artifact)
);

export const validatedGenreNodes = genreNodes.map(node =>
  validateOrThrow(genreNodeSchema, node)
);

export const validatedSlotFilters = slotFilters.map(filter =>
  validateOrThrow(slotFilterSchema, filter)
);

export { rarityOrder, itemTypeLabels };

export type { Artifact } from './data';
