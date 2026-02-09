import { sites } from '@/data/sites';

type StructuredDataProps = {
  type: 'organization' | 'website' | 'itemlist' | 'creativeWork';
  data?: Record<string, unknown>;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexai.directory';

const schemas = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NEXAI',
    description: 'Une zone corrompue. Un directory horizontal avec glitch.',
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.png`,
    sameAs: [],
    inLanguage: 'fr',
  },

  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'NEXAI - Collection Corrompue',
    description: 'Une zone corrompue. Un directory horizontal avec glitch.',
    url: SITE_URL,
    copyrightYear: new Date().getFullYear(),
    inLanguage: 'fr',
  },

  creativeWork: {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'NEXAI Collection',
    description: 'Collection de sites web expérimentaux avec esthétique glitch et corruption numérique.',
    genre: ['Design', 'Portfolio', 'SaaS', 'E-commerce'],
    inLanguage: 'fr',
  },

  itemlist: {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'NEXAI Directory',
    description: 'Collection de sites web expérimentaux',
    itemListElement: sites.map((site, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'WebSite',
        name: site.name,
        description: site.description,
        url: site.url,
        genre: site.tags,
        keywords: [...site.tags, site.category],
      },
    })),
  },
};

export function StructuredData({ type, data }: StructuredDataProps) {
  const schema = data ? { ...schemas[type], ...data } : schemas[type];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
