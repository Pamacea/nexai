import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { sites } from '@/data/sites';
import { StructuredData } from '@/components/StructuredData';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexai.directory';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return sites.map((site) => ({
    id: site.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<{
  title: string;
  description: string;
  openGraph: {
    type: string;
    locale: string;
    url: string;
    title: string;
    description: string;
    images: { url: string; width: number; height: number; alt: string }[];
    siteName: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    images: string[];
  };
  alternates: {
    canonical: string;
  };
}> {
  const { id } = await params;
  const site = sites.find((s) => s.id === id);

  if (!site) {
    return {
      title: 'Site Non Trouvé | NEXAI',
      description: 'Ce site n\'existe pas dans la collection NEXAI.',
      openGraph: {
        type: 'website',
        locale: 'fr_FR',
        url: SITE_URL,
        title: 'Site Non Trouvé | NEXAI',
        description: 'Ce site n\'existe pas dans la collection NEXAI.',
        images: [],
        siteName: 'NEXAI',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Site Non Trouvé | NEXAI',
        description: 'Ce site n\'existe pas dans la collection NEXAI.',
        images: [],
      },
      alternates: {
        canonical: SITE_URL,
      },
    };
  }

  return {
    title: `${site.name} | NEXAI Collection Corrompue`,
    description: site.description,
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: `${SITE_URL}/site/${site.id}`,
      title: site.name,
      description: site.description,
      images: [
        {
          url: `${SITE_URL}${site.image}`,
          width: 1200,
          height: 630,
          alt: site.name,
        },
      ],
      siteName: 'NEXAI',
    },
    twitter: {
      card: 'summary_large_image',
      title: site.name,
      description: site.description,
      images: [`${SITE_URL}${site.image}`],
    },
    alternates: {
      canonical: `${SITE_URL}/site/${site.id}`,
    },
  };
}

export default async function SitePage({ params }: PageProps) {
  const { id } = await params;
  const site = sites.find((s) => s.id === id);

  if (!site) {
    notFound();
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: site.name,
    description: site.description,
    url: site.url,
    image: `${SITE_URL}${site.image}`,
    genre: site.category,
    keywords: [...site.tags, site.category].join(', '),
    author: {
      '@type': 'Organization',
      name: 'NEXAI',
    },
    inLanguage: 'fr',
  };

  return (
    <main className="void-bg min-h-screen w-screen px-8 py-12">
      <StructuredData type="creativeWork" data={structuredData} />

      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-sm text-red-600 hover:text-slate-50 transition-colors uppercase mb-6"
            aria-label="Retour à l'accueil"
          >
            <span>←</span>
            <span>Retour</span>
          </Link>

          <div className="mb-4">
            <span className="font-mono text-xs uppercase text-red-600 border border-red-600/50 px-3 py-1">
              {site.category}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold uppercase text-slate-50 mb-6 glitch-text" data-text={site.name}>
            {site.name}
          </h1>

          <p className="font-mono text-slate-50/80 text-lg leading-relaxed">
            {site.description}
          </p>
        </header>

        <section className="mb-12" aria-label="Capture d'écran du site">
          <div className="relative aspect-video bg-slate-950 border-2 border-red-600/30 overflow-hidden group">
            <Image
              src={site.image}
              alt={`Capture d'écran de ${site.name}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
            <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        </section>

        <section className="mb-12" aria-label="Caractéristiques">
          <div className="bg-slate-950/50 border-2 border-red-600/30 p-8">
            <h2 className="text-2xl font-bold uppercase text-slate-50 mb-6">
              Caractéristiques
            </h2>

            <div className="space-y-4">
              <div>
                <dt className="font-mono text-xs uppercase text-red-600 mb-2">Catégorie</dt>
                <dd className="text-slate-50 capitalize">{site.category}</dd>
              </div>

              <div>
                <dt className="font-mono text-xs uppercase text-red-600 mb-2">Tags</dt>
                <dd className="flex flex-wrap gap-2">
                  {site.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-sm text-slate-50/60 uppercase"
                    >
                      #{tag}
                    </span>
                  ))}
                </dd>
              </div>
            </div>
          </div>
        </section>

        <footer className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="font-mono text-xs text-slate-50/40 uppercase">
            Fourni par NEXAI Collection Corrompue
          </p>

          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="corrupted-btn inline-flex items-center gap-2 bg-transparent border-2 border-red-600 text-slate-50 px-6 py-3 font-mono text-sm font-bold uppercase cursor-pointer transition-all duration-200 hover:bg-red-600 hover:text-slate-950"
            aria-label={`Visiter ${site.name} (ouvre dans un nouvel onglet)`}
          >
            <span>Visiter le site</span>
            <span>→</span>
          </a>
        </footer>
      </article>
    </main>
  );
}
