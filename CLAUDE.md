# NEXAI - Claude Code Context

> Guide pour Claude Code / Claude AI sur l'architecture et conventions du projet NEXAI

---

## 🎯 Project Overview

**NEXAI** est un directory horizontal avec esthétique glitch, construit avec Next.js 15.5 et React 19.2.

### Type
- Expérimental / Portfolio / Directory
- Navigation horizontale immersive
- Performance-focused avec Web Vitals monitoring

### Stack Key Points
- **Next.js App Router** - Server Components优先
- **React Compiler** - Optimisations automatiques activées
- **TypeScript Strict** - Zéro `any` sans justification
- **Zod Everywhere** - Validation à l'entrée (parse, don't validate)

---

## 📁 Architecture

### Unidirectional Flow

```
app/ → components/ → hooks/ → lib/stores/
```

**Règle**: Les dépendances vont vers le bas, jamais vers le haut.

### Folder Structure

```
nexai/
├── app/              # Routing ONLY (page.tsx, layout.tsx, loading.tsx)
├── components/       # Feature UI components
│   ├── [feature]/   # Feature-specific components
│   └── *.tsx        # Shared components
├── hooks/           # React hooks (use prefix)
├── lib/             # Non-UI code
│   ├── stores/      # Zustand stores
│   └── *.ts         # Utilities, config
├── shared/          # Réutilisable (could be extracted to package)
│   ├── errors/      # Custom error classes
│   ├── schemas/     # Zod schemas
│   ├── testing/     # Test utilities
│   └── utils/       # Pure functions
└── data/            # Static data (sites.ts)
```

### Component Organization

**Est-ce utilisé par une seule feature?**
- **OUI** → `components/[feature]/`
- **NON** (2+ features) → `components/*.tsx`

**Est-ce du code métier vs UI?**
- **UI** → `components/`
- **Logique** → `hooks/` ou `lib/stores/`
- **Utilitaire** → `shared/utils/`

---

## 🎨 Conventions

### Naming

| Type | Convention | Example |
|------|------------|---------|
| Components | `PascalCase.tsx` | `HeroSlide.tsx` |
| Hooks | `useCamelCase.ts` | `useNavigation.ts` |
| Utils | `camelCase.ts` | `formatData.ts` |
| Stores | `use[Name]Store.ts` | `useNavigationStore.ts` |
| Types | `*.types.ts` ou `types.ts` | `site.types.ts` |
| Tests | `*.test.ts` | `validation.test.ts` |

### Imports

**Order**:
1. External (react, next, zod...)
2. Internal shared (`@/shared/...`)
3. Features (`@/components/...`)
4. Types
5. Styles (si applicable)

```typescript
// ✅ CORRECT
import { useState } from 'react'
import { z } from 'zod'
import { validate } from '@/shared/utils'
import { useNavigationStore } from '@/lib/stores'
import type { Site } from '@/shared/types'
```

### Barrel Exports

Un `index.ts` par dossier est **obligatoire**:

```typescript
// components/catalog/index.ts
export { CatalogSlide } from './CatalogSlide'
```

---

## 🔥 Critical Rules

### 1. NO `any` sans `_` prefix

```typescript
// ❌ FAUX
function process(data: any) { ... }

// ✅ CORRECT
function process(data: unknown) {
  const validated = schema.parse(data)
  // ...
}

// ✅ ACCEPTÉ (avec underscore)
function _tempHack(data: any) { ... }
```

### 2. Zod pour TOUTE validation

```typescript
// ✅ CORRECT - Parse, don't validate
import { z } from 'zod'

const siteSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  url: z.string().url(),
})

const validated = siteSchema.parse(input)
```

### 3. Gap > Margin

```typescript
// ❌ FAUX - Margin sur child
<div className="ml-4">...</div>

// ✅ CORRECT - Gap sur parent
<div className="gap-4">
  <div>...</div>
</div>
```

### 4. Slate-950 > Black

```typescript
// ❌ FAUX
className="bg-black text-white"

// ✅ CORRECT
className="bg-slate-950 text-slate-50"
```

### 5. Relative > Fixed max-width

```typescript
// ❌ FAUX
className="max-w-xl"

// ✅ CORRECT
className="w-1/2 max-w-[60%]"
```

---

## 🧪 Testing

### Structure (A-A-A)

```typescript
import { describe, it, expect } from 'vitest'

describe('FunctionName', () => {
  it('should do something', async () => {
    // Arrange
    const input = { ... }

    // Act
    const result = await functionToTest(input)

    // Assert
    expect(result).toEqual(expected)
  })
})
```

### Mocking

**Mock ONLY externals**:
- API calls
- Database
- Time (Date.now)
- Browser APIs (window, navigator)

**NEVER mock** ce que tu testes.

---

## 🚀 Performance

### React Compiler

Le **React Compiler est ACTIF** dans `next.config.ts`:

```typescript
experimental: {
  reactCompiler: true,
}
```

**Pas besoin** de:
- `useMemo` (sauf calculs très lourds)
- `useCallback` (sauf props ref)
- Memo manuel des components

**TOUJOURS**:
- Props stables (pas d'objets inline)
- Hooks dans le bon ordre
- Clés stables pour les listes

### Dynamic Imports

```typescript
// ✅ CORRECT
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
})
```

### Code Splitting

Les routes sont automatiquement split par Next.js.
Pour les composants lourds, utiliser `dynamic()`.

---

## 🎯 Next.js Specifics

### App Router Rules

`app/` contient **UNIQUEMENT**:
- `page.tsx` - Entry point
- `layout.tsx` - Layouts
- `loading.tsx` - Skeletons
- `error.tsx` - Error boundaries
- `route.ts` - Webhooks/API routes

**PAS de logique métier** dans `app/`.
Importer depuis `components/` et `lib/`.

### Server Components

Utiliser **Server Components par défaut**:
- Pas de `'use client'` sauf nécessité
- Pas de hooks dans Server Components
- Les composants avec hooks → `'use client'` + dossier séparé

### Metadata

```typescript
export const metadata: Metadata = {
  title: 'Page Title | NEXAI',
  description: '...',
  openGraph: { ... },
  twitter: { ... },
}
```

---

## 📦 State Management

### Client State (Ephemeral)

**Zustand** pour l'état client local:

```typescript
// lib/stores/useNavigationStore.ts
import create from 'zustand'

export const useNavigationStore = create((set) => ({
  currentSlide: 0,
  goToSlide: (index) => set({ currentSlide: index }),
}))
```

### Server State

Prêt pour **TanStack Query** (non implémenté encore):
- `useQuery` pour GET
- `useMutation` pour POST/PUT/DELETE

---

## 🐛 Debugging

### Performance Monitoring

Le `PerformanceMonitor` component log les Web Vitals:

```typescript
// En développement: Console logs
// En production: Vercel Analytics
```

### Error Boundary

`ErrorBoundary` catch les erreurs React:
- Fallback UI
- Error logging
- Recovery options

---

## 🔧 Dev Workflow

### Avant de commiter

```bash
# 1. Type check
npx tsc --noEmit

# 2. Lint
npm run lint

# 3. Tests
npm run test:run

# 4. Build
npm run build
```

### Commit Messages

```
feat(scope): description

- Change 1
- Change 2

Closes #123
```

**Types**: `feat`, `fix`, `refactor`, `perf`, `test`, `docs`, `chore`

---

## 🎓 Design Philosophy

### Principles

1. **Correctness > Completeness > Speed**
2. **Verify post-2024 libs** before implementing
3. **Follow existing patterns** (never guess)
4. **Keep it simple** - DRY après 3x, pas avant
5. **Self-documenting code** - Commenter le "pourquoi", pas le "quoi"

### Aesthetics

- **Glitch** - Artéfacts visuels contrôlés
- **Corruption** - Effets de distorsion procéduraux
- **Minimal** - UI épurée, focus sur l'expérience
- **Performant** - Jamais au détriment des Core Web Vitals

---

## 📚 Resources

### Internal

- `README.md` - Project documentation
- `shared/utils/` - Pure functions réutilisables
- `shared/schemas/` - Zod schemas
- `lib/stores/` - Zustand stores

### External

- [Next.js 15 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [Zod Docs](https://zod.dev)
- [Vitest Docs](https://vitest.dev)

---

## 🤖 For Claude AI

### When Working on This Project

1. **READ files before editing** - Never guess
2. **Follow existing patterns** - Look at similar files
3. **Type-check changes** - Run `npx tsc --noEmit`
4. **Test after changes** - Run affected tests
5. **Keep changes minimal** - Only touch what's necessary

### Common Tasks

**Add new slide**:
1. Create `components/[name]/[Name]Slide.tsx`
2. Add to `components/slides/Slides.tsx`
3. Add data in `data/sites.ts` (si applicable)

**Add new component**:
1. Single feature → `components/[feature]/`
2. Shared → `components/*.tsx`
3. Add barrel export `index.ts`

**Fix bug**:
1. Reproduce first
2. Fix root cause (pas workaround)
3. Add test (si applicable)
4. Verify no regressions

---

**Version**: 0.5.0
**Last Updated**: 2026-02-09
**Maintainer**: Pamacea
