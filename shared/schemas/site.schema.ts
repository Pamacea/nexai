import { z } from 'zod';

export const categorySchema = z.enum(['design', 'saas', 'ecommerce', 'portfolio']);

export const siteSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(200),
  description: z.string().min(1).max(500),
  url: z.string().url(),
  category: categorySchema,
  image: z.string().min(1),
  tags: z.array(z.string().min(1)).min(1).max(10),
});

export type SiteInput = z.infer<typeof siteSchema>;
export type Category = z.infer<typeof categorySchema>;
