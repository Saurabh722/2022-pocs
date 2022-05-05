// Libraries.

import React from 'react';

// Dependencies.

import { StyledErrorMessage } from '@vsdp/flagship-src/react/components/ErrorMessage/styles';

// Types.

/** @typedef {import('./types').ErrorMessageProps} ErrorMessageProps */

// Public.

/**
 * @function ErrorMessage
 * @description ErrorMessage component.
 * @param {ErrorMessageProps} props Properties.
 * @returns {JSX.Element} ErrorMessage component.
 */
const ErrorMessage = ({
  errorKey,
  hasBorder,
  height = 'auto',
  message = 'Something went wrong.',
  topOffset = '0',
  ...otherProps
}) => (
  <StyledErrorMessage
    data-testid="ErrorMessage"
    color="neutral95"
    fontScale="fs-xs"
    fontWeight="fw-bolder"
    forwardedAs="article"
    $hasBorder={hasBorder}
    $height={height}
    $topOffset={topOffset}
    {...(errorKey && { 'data-error-key': errorKey })}
    {...otherProps}
  >
    <h2>It looks like something went wrong.</h2>
    <p>{message}</p>
  </StyledErrorMessage>
);

export default ErrorMessage;
