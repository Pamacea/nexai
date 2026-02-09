/**
 * Dynamic imports for code splitting and lazy loading
 * Use these to reduce initial bundle size
 */

'use client';

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

/**
 * Lazy load the CorruptedArtifactCard component
 * Only loaded when needed (e.g., when user scrolls to catalogue section)
 */
export function dynamicImportCorruptedArtifactCard(): ComponentType<any> {
  return dynamic(
    () => import('@/components/CorruptedArtifactCard').then(mod => ({ default: mod.CorruptedArtifactCard })),
    {
      loading: () => (
        <div className="corrupted-card bg-void-black/50 border-2 border-blood-red/30 p-6 animate-pulse">
          <div className="h-6 bg-blood-red/20 rounded mb-4"></div>
          <div className="h-4 bg-blood-red/10 rounded mb-2"></div>
          <div className="h-4 bg-blood-red/10 rounded w-2/3"></div>
        </div>
      ),
      ssr: false, // Client-side only for better performance
    }
  );
}

/**
 * Lazy load PerformanceMonitor (development only)
 */
export function dynamicImportPerformanceMonitor(): ComponentType<any> | null {
  if (process.env.NODE_ENV === 'development') {
    return dynamic(
      () => import('@/components/PerformanceMonitor').then(mod => ({ default: mod.PerformanceMonitor })),
      { ssr: false }
    );
  }
  return null;
}

/**
 * Lazy load analytics (production only)
 * TODO: Create analytics module before using this function
 */
export function dynamicImportAnalytics(): ComponentType<any> | null {
  if (process.env.NODE_ENV === 'production') {
    // Placeholder for future analytics implementation
    // return dynamic(() => import('@/lib/analytics'), {
    //   ssr: false,
    // });
  }
  return null;
}
