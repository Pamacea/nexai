/**
 * Performance monitoring utilities for NEXAI
 * Uses Web Vitals API for Core Web Vitals tracking
 */

import React from 'react';

export interface WebVitals {
  FCP?: number; // First Contentful Paint
  LCP?: number; // Largest Contentful Paint
  FID?: number; // First Input Delay
  CLS?: number; // Cumulative Layout Shift
  TTFB?: number; // Time to First Byte
}

export interface PerformanceMetrics {
  vitals: WebVitals;
  navigationTiming: PerformanceNavigationTiming | null;
  resourceCount: number;
  memoryUsage?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

/**
 * Measure Core Web Vitals using Performance Observer API
 */
export function measureWebVitals(callback: (metric: WebVitals) => void) {
  const vitals: WebVitals = {};

  // First Contentful Paint (FCP)
  try {
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformancePaintTiming;
      if (lastEntry) {
        vitals.FCP = lastEntry.startTime;
        callback(vitals);
      }
    });
    fcpObserver.observe({ entryTypes: ['paint'] });
  } catch (_e) {
    console.warn('FCP not supported');
  }

  // Largest Contentful Paint (LCP)
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        vitals.LCP = lastEntry.startTime;
        callback(vitals);
      }
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (_e) {
    console.warn('LCP not supported');
  }

  // First Input Delay (FID) - deprecated in favor of INP
  try {
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        vitals.FID = entry.processingStart - entry.startTime;
        callback(vitals);
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });
  } catch (_e) {
    console.warn('FID not supported');
  }

  // Cumulative Layout Shift (CLS)
  try {
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          vitals.CLS = clsValue;
          callback(vitals);
        }
      });
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  } catch (_e) {
    console.warn('CLS not supported');
  }

  // Time to First Byte (TTFB)
  if (performance.getEntriesByType('navigation').length > 0) {
    const navigation = performance.getEntriesByType('navigation')[0] as any;
    vitals.TTFB = navigation.responseStart;
    callback(vitals);
  }
}

/**
 * Get comprehensive performance metrics
 */
export function getPerformanceMetrics(): PerformanceMetrics {
  const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | null;
  const resources = performance.getEntriesByType('resource');

  const metrics: PerformanceMetrics = {
    vitals: {},
    navigationTiming,
    resourceCount: resources.length,
  };

  // Memory usage (if available, Chrome-only)
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    metrics.memoryUsage = {
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
    };
  }

  return metrics;
}

/**
 * Log performance metrics to console in development
 */
export function logPerformanceMetrics(metrics: PerformanceMetrics) {
  if (process.env.NODE_ENV !== 'production') {
    console.group('🚀 Performance Metrics');

    if (metrics.vitals.FCP) {
      console.log(`FCP: ${metrics.vitals.FCP.toFixed(0)}ms`);
    }
    if (metrics.vitals.LCP) {
      console.log(`LCP: ${metrics.vitals.LCP.toFixed(0)}ms`);
    }
    if (metrics.vitals.FID) {
      console.log(`FID: ${metrics.vitals.FID.toFixed(0)}ms`);
    }
    if (metrics.vitals.CLS) {
      console.log(`CLS: ${metrics.vitals.CLS.toFixed(3)}`);
    }
    if (metrics.vitals.TTFB) {
      console.log(`TTFB: ${metrics.vitals.TTFB.toFixed(0)}ms`);
    }

    console.log(`Resources loaded: ${metrics.resourceCount}`);

    if (metrics.memoryUsage) {
      const usedMB = (metrics.memoryUsage.usedJSHeapSize / 1048576).toFixed(2);
      const totalMB = (metrics.memoryUsage.totalJSHeapSize / 1048576).toFixed(2);
      const limitMB = (metrics.memoryUsage.jsHeapSizeLimit / 1048576).toFixed(2);
      console.log(`Memory: ${usedMB}MB / ${totalMB}MB (limit: ${limitMB}MB)`);
    }

    console.groupEnd();
  }
}

/**
 * Measure function execution time
 */
export function measurePerformance<T extends (...args: any[]) => any>(
  fn: T,
  label: string
): T {
  return ((...args: any[]) => {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();

    if (process.env.NODE_ENV !== 'production') {
      console.log(`⏱️ ${label}: ${(end - start).toFixed(2)}ms`);
    }

    return result;
  }) as T;
}

/**
 * React hook for performance monitoring
 */
export function usePerformanceMonitoring() {
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    measureWebVitals((_vitals) => {
      const metrics = getPerformanceMetrics();
      logPerformanceMetrics(metrics);

      // In production, send to analytics
      if (process.env.NODE_ENV === 'production') {
        // TODO: Send to analytics service
        // sendToAnalytics(vitals);
      }
    });
  }, []);

  if (typeof window === 'undefined') return null;

  return getPerformanceMetrics();
}
