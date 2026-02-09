import type { MetadataRoute } from 'next';
import { sites } from '@/data/sites';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexai.directory';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];

  const siteUrls: MetadataRoute.Sitemap = sites.map((site) => ({
    url: `${baseUrl}/site/${site.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticUrls, ...siteUrls];
}
