'use client';

import { useEffect, useState } from 'react';
import { getPerformanceMetrics, logPerformanceMetrics, type PerformanceMetrics } from '@/lib/performance';

/**
 * Performance Monitor Component
 * Displays real-time performance metrics in development mode
 */
export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV === 'development') {
      // Collect metrics after page load
      const timer = setTimeout(() => {
        const collectedMetrics = getPerformanceMetrics();
        setMetrics(collectedMetrics);
        logPerformanceMetrics(collectedMetrics);
      }, 1000);

      // Update metrics every 5 seconds
      const interval = setInterval(() => {
        const collectedMetrics = getPerformanceMetrics();
        setMetrics(collectedMetrics);
      }, 5000);

      // Keyboard shortcut: Ctrl+Shift+P to toggle
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'P') {
          setIsVisible(prev => !prev);
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, []);

  if (process.env.NODE_ENV !== 'production' && !isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-blood-red/20 border border-blood-red/30 text-bone-white/70 px-3 py-2 text-xs font-space-mono rounded hover:bg-blood-red/30 transition-colors z-50"
        aria-label="Show performance monitor"
      >
        🚀 Perf
      </button>
    );
  }

  if (process.env.NODE_ENV === 'production' || !metrics) {
    return null;
  }

  const getScoreColor = (value: number, good: number, needsImprovement: number) => {
    if (value <= good) return 'text-green-400';
    if (value <= needsImprovement) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="fixed bottom-4 right-4 bg-void-black/95 border border-blood-red/30 p-4 rounded-lg shadow-xl max-w-sm z-50 font-space-mono text-xs">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-bone-white font-bold uppercase">Performance</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-bone-white/50 hover:text-bone-white transition-colors"
          aria-label="Close performance monitor"
        >
          ✕
        </button>
      </div>

      <div className="space-y-2">
        {metrics.vitals.FCP && (
          <div className="flex justify-between">
            <span className="text-bone-white/70">FCP:</span>
            <span className={getScoreColor(metrics.vitals.FCP, 1800, 3000)}>
              {metrics.vitals.FCP.toFixed(0)}ms
            </span>
          </div>
        )}

        {metrics.vitals.LCP && (
          <div className="flex justify-between">
            <span className="text-bone-white/70">LCP:</span>
            <span className={getScoreColor(metrics.vitals.LCP, 2500, 4000)}>
              {metrics.vitals.LCP.toFixed(0)}ms
            </span>
          </div>
        )}

        {metrics.vitals.FID && (
          <div className="flex justify-between">
            <span className="text-bone-white/70">FID:</span>
            <span className={getScoreColor(metrics.vitals.FID, 100, 300)}>
              {metrics.vitals.FID.toFixed(0)}ms
            </span>
          </div>
        )}

        {metrics.vitals.CLS !== undefined && (
          <div className="flex justify-between">
            <span className="text-bone-white/70">CLS:</span>
            <span className={getScoreColor(metrics.vitals.CLS, 0.1, 0.25)}>
              {metrics.vitals.CLS.toFixed(3)}
            </span>
          </div>
        )}

        {metrics.vitals.TTFB && (
          <div className="flex justify-between">
            <span className="text-bone-white/70">TTFB:</span>
            <span className={getScoreColor(metrics.vitals.TTFB, 800, 1800)}>
              {metrics.vitals.TTFB.toFixed(0)}ms
            </span>
          </div>
        )}

        <div className="flex justify-between border-t border-blood-red/20 pt-2 mt-2">
          <span className="text-bone-white/70">Resources:</span>
          <span className="text-bone-white">{metrics.resourceCount}</span>
        </div>

        {metrics.memoryUsage && (
          <div className="flex justify-between">
            <span className="text-bone-white/70">Memory:</span>
            <span className="text-bone-white">
              {(metrics.memoryUsage.usedJSHeapSize / 1048576).toFixed(1)}MB
            </span>
          </div>
        )}
      </div>

      <div className="mt-3 pt-2 border-t border-blood-red/20 text-bone-white/40 text-[10px] text-center">
        Press Ctrl+Shift+P to toggle
      </div>
    </div>
  );
}
