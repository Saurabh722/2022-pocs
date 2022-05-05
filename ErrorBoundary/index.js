// Libraries.

import * as g from '@mgdp/garter';
import UU from '@mgdp/underwire';
import React from 'react';

// Dependencies.

import ErrorMessage from '@vsdp/flagship-src/react/components/ErrorMessage';

// Types.

/** @typedef {import('./types').ErrorBoundaryProps} ErrorBoundaryProps */
/** @typedef {import('./types').ErrorBoundaryState} ErrorBoundaryState */

// Public.

/**
 * ErrorBoundary component.
 *
 * @augments React.Component<ErrorBoundaryProps,ErrorBoundaryState>
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    const { onError } = this.props;
    // Run custom handler.
    const skipDefaultHandler = onError?.(error, errorInfo) === false;
    if (skipDefaultHandler) {
      return;
    }

    // TODO log the error like we did in underwire.
    UU.log(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children, customFallback, disableFallback, ...otherProps } = this.props;

    // If error exists and fallback is not disabled.
    if (hasError && !disableFallback) {
      // Return custom or default fallback.
      return g.isDefined(customFallback) ? (
        customFallback
      ) : (
        <ErrorMessage {...otherProps} />
      );
    }

    // If children is a function, call it by passing state as argument.
    // Output the markup.
    return g.isFunction(children) ? children(this.state) : children;
  }
}

export default ErrorBoundary;
