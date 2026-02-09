'use client';

import React from 'react';
import { AppError } from '@/shared/errors';

interface Props {
  children: React.ReactNode;
  fallback?: (error: Error, retry: () => void) => React.ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.handleRetry);
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
          <div className="max-w-md w-full bg-slate-900 border border-red-500 rounded-lg p-6">
            <h2 className="text-red-500 text-xl font-bold mb-4">
              SYSTEM CORRUPTION DETECTED
            </h2>
            <p className="text-slate-300 mb-4">
              {this.state.error instanceof AppError
                ? this.state.error.message
                : 'An unexpected error occurred'}
            </p>
            <button
              onClick={this.handleRetry}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              REBOOT SYSTEM
            </button>
            <pre className="mt-4 text-xs text-slate-500 overflow-auto">
              {this.state.error.stack}
            </pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
