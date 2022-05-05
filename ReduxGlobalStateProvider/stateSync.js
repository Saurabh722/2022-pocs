// Libraries.

import useUnderwire from '@vsdp/flagship-src/react/utilities/use-underwire';

// Dependencies.

import { useUUDispatch } from './utils';

// Public.

/**
 * A utility that listens to UU state change and sync it to React Store.
 * Will be retired with UU deprecation.
 *
 * @returns {null} No DOM element should be rendered.
 */
export default function StateSync() {
  const UU = useUnderwire();
  const dispatch = useUUDispatch();

  UU.addStateListener('bag.count', (bagCount) =>
    dispatch({
      type: 'react-shopping-bag-count-update',
      data: {
        bagCount,
      },
    })
  );

  return null;
}
