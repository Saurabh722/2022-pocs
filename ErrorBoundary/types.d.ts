// Libraries.

import React from 'react';

// Public.

export type ErrorBoundaryState = {
	/**
	 * Whether an error is captured.
	 */
	hasError: boolean;
};

export type ErrorBoundaryProps = {
	/**
	 * Children.
	 */
	children: React.ReactNode | ((state: ErrorBoundaryState) => React.ReactNode);
	/**
	 * Custom fallback.
	 */
	customFallback?: React.ReactNode;
	/**
	 * Whether to disable fallback.
	 */
	disableFallback?: boolean;
	/**
	 * Custom error handler. Return false to disable default handler.
	 */
	onError?: (error: Error, errorInfo: React.ErrorInfo) => void | false;
};