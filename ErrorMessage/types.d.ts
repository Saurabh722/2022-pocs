// Libraries.

import React from 'react';

// Public.

export type ErrorMessageProps = {
	/**
	 * Error key.
	 */
	errorKey?: string;
	/**
	 * Whether
	 */
	hasBorder?: boolean;
	/**
	 * Height of error message.
	 */
	height?: string;
	/**
	 * Error message.
	 */
	message?: React.ReactNode;
	/**
	 * Top offset of message.
	 */
	topOffset?: string;
};