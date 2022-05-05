// Libraries.

import styled from 'styled-components';

// Dependencies.

import Typography from '@mgdp/prism/src/components/Typography';

// Public.

// eslint-disable-next-line import/prefer-default-export
export const StyledErrorMessage = styled(Typography)`
  ${({ theme, $hasBorder, $height, $topOffset }) => `
    align-items: center;
    background-color: ${theme.colors.neutral5};
    height: ${$height};
    flex-direction: column;
    display: flex;
    justify-content: center;
    width: 100%;


    ${
      $hasBorder
        ? `
            border: 1px solid ${theme.colors.neutral10};
          `
        : ``
    }

    & > h2 {
      margin-top: ${$topOffset};
      padding-top: ${theme.spacing.xs};
    }

    & > p {
      padding-bottom: ${theme.spacing.xs};
    }
  `}
`;
