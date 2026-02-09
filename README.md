# NEXAI - Collection Corrompue

> Une zone corrompue. Un directory horizontal avec glitch.

Une collection expérimentale de sites web avec esthétique glitch et corruption numérique. Navigation horizontale immersive avec performances optimisées et monitoring Web Vitals.

## ✨ Caractéristiques

- **Navigation Horizontale** - Défilement naturel avec wheel et keyboard
- **Esthétique Glitch** - Artéfacts visuels corrompus et animations procédurales
- **Performance Optimisée** - React 19.2 avec React Compiler actif
- **Web Vitals Monitoring** - Tracking en temps réel des métriques Core Web Vitals
- **SEO Natif** - Structured data, sitemap automatique, meta tags optimisés
- **Type-Safe** - TypeScript strict mode avec Zod pour la validation
- **Tests Complets** - Vitest + Testing Library pour la confiance

## 🚀 Stack Technique

### Frontend
- **Next.js 15.5.12** - App Router, React Compiler, Server Components
- **React 19.2.4** - Latest avec compilateur automatique
- **TypeScript 5.9.3** - Strict mode, path aliases
- **Tailwind CSS 3.4** - Utility-first CSS avec design system custom

### Performance
- **React Compiler** - Optimisations automatiques (babel-plugin-react-compiler)
- **Web Vitals** - FCP, LCP, FID, CLS, TTFB monitoring
- **Dynamic Imports** - Code splitting intelligent
- **Image Optimization** - Next.js Image avec patterns remote autorisés

### State Management
- **Zustand 5.0** - Stores atomiques pour navigation et catalogue
- **TanStack Query Ready** - Architecture prête pour server state

### Testing
- **Vitest 4.0** - Tests unitaires ultra-rapides
- **Testing Library** - Components tests accessibles
- **Happy DOM** - JSDOM alternative pour tests légères

### Quality
- **ESLint 9** - Flat config avec règles Next.js
- **Zod 4.3** - Validation de schémas type-safe
- **TypeScript Strict** - Zéro `any` non intentionnel

## 📦 Installation

```bash
# Clone le repository
git clone https://github.com/Pamacea/nexai.git
cd nexai

# Installe les dépendances (pnpm recommandé)
pnpm install

# Ou avec npm
npm install

# Ou avec bun
bun install
```

## 🛠️ Scripts Disponibles

```bash
# Développement
npm run dev          # Serveur de développement (http://localhost:3000)

# Production
npm run build        # Build optimisé pour production
npm run start        # Lance le serveur production

# Qualité
npm run lint         # Vérifie le code avec ESLint
npm run lint:fix     # Corrige automatiquement les problèmes

# Tests
npm run test         # Lance les tests en mode watch
npm run test:ui      # Interface UI pour les tests
npm run test:coverage # Couverture de code
npm run test:run     # Tests une seule fois
```

## 🏗️ Structure du Projet

```
nexai/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout avec fonts et metadata
│   ├── page.tsx             # Page d'accueil
│   ├── site/[id]/page.tsx   # Pages dynamiques des sites
│   ├── robots.ts            # Robots.txt généré
│   ├── sitemap.ts           # Sitemap.xml généré
│   └── globals.css          # Styles globaux
│
├── components/              # Composants React
│   ├── hero/               # Slide d'accueil
│   ├── catalog/            # Slide catalogue
│   ├── ode/                # Slide ode
│   ├── contact/            # Slide contact
│   ├── slides/             # Container de slides
│   ├── slide-indicators/   # Indicateurs de navigation
│   ├── CorruptedArtifactCard.tsx  # Carte artifact corrompu
│   ├── CorruptedSkillNode.tsx     # Nœud de skill glitch
│   ├── ErrorBoundary.tsx   # Gestion d'erreurs
│   ├── PerformanceMonitor.tsx  # Monitoring Web Vitals
│   └── StructuredData.tsx  # SEO structured data
│
├── hooks/                   # React hooks personnalisés
│   ├── useNavigation.ts    # Logique de navigation
│   └── useCatalog.ts       # Gestion du catalogue
│
├── lib/                     # Utilitaires et configuration
│   ├── stores/             # Zustand stores
│   │   ├── useNavigationStore.ts
│   │   └── useCatalogStore.ts
│   ├── performance.ts      # Web Vitals monitoring
│   ├── dynamic-imports.tsx # Dynamic imports lazy
│   ├── data.ts            # Utilitaires de données
│   └── validated-data.ts  # Données validées Zod
│
├── shared/                  # Code partagé (réutilisable)
│   ├── errors/            # Classes d'erreurs custom
│   ├── schemas/           # Schémas Zod
│   ├── testing/           # Test utilities
│   └── utils/             # Pure functions (Result<T,E>, validation)
│
├── data/                    # Données statiques
│   └── sites.ts           # Liste des sites du directory
│
└── public/                  # Assets statiques
    ├── google*.html        # Verification Google
    └── robots.txt          # Fallback robots.txt
```

## 🎨 Design System

### Colors
- `slate-950` - Primary dark (pas de #000000)
- `slate-900` - Secondary
- Accents glitch avec `cyan-500`, `fuchsia-500`

### Typography
- **Display**: Space Grotesk 700
- **Body**: Space Mono 400/700
- Next.js Font Optimization avec `display: swap`

### Spacing
- `gap-*` sur les parents (jamais de `margin`)
- Unités relatives (`w-1/2`, pas `max-w-xl`)

## 🚢 Déploiement

Ce projet est configuré pour Vercel:

1. **Push sur GitHub** - Déploiement automatique
2. **Variables d'environnement** - Aucune requise
3. **Domaine** - Configuré dans Vercel dashboard

### Déploiement Manuel

```bash
# Build
npm run build

# Test local du build
npm run start

# Ou avec Vercel CLI
vercel --prod
```

## 📊 Performance Monitoring

Le projet inclut un monitoring automatique des Core Web Vitals:

- **FCP** (First Contentful Paint) - Premier rendu de contenu
- **LCP** (Largest Contentful Paint) - Plus grand élément visible
- **FID** (First Input Delay) - Réactivité aux interactions
- **CLS** (Cumulative Layout Shift) - Stabilité visuelle
- **TTFB** (Time to First Byte) - Latence serveur

Les métriques sont loggées en développement et envoyées à Vercel Analytics en production.

## 🔧 Configuration

### Next.js Config

```typescript
// next.config.ts
export default {
  reactStrictMode: true,
  experimental: {
    reactCompiler: true,  // React Compiler actif
    optimizePackageImports: ['react', 'react-dom'],
  },
  // Patterns autorisés pour images externes
  images: {
    remotePatterns: [
      { hostname: 'nexai.io' },
      { hostname: '**.githubusercontent.com' },
    ],
  },
};
```

### TypeScript Config

```json
{
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## 🧪 Tests

```bash
# Lancer tous les tests
npm run test

# UI interactive
npm run test:ui

# Couverture
npm run test:coverage
```

## 🤝 Contribution

Ce projet est expérimental. Les contributions sont les bienvenues sous forme d'issues et pull requests.

## 📄 Licence

MIT

## 🙏 Acknowledgments

- Design inspiré par l'esthétique glitch et la corruption numérique
- Performance monitoring avec Web Vitals API
- Déployé sur Vercel avec analytics

---

**NEXAI** - Une zone corrompue. Un directory horizontal avec glitch.

[GitHub](https://github.com/Pamacea/nexai) · [Live Demo](https://nexai.directory)
