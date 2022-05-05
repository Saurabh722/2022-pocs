// Libraries.

import * as g from '@mgdp/garter';

// Public.

/**
 * A method that listens to react shadow store state change
 * and sync it to UU state with UU.updateState() method in globalReducer
 *
 * @param {Function} getState obtain globalReducer.
 * @returns execute next action.
 */

export const updateUUState = ({ getState }) => (next) => (action) => {
  const { globalReducer } = getState();
  const { uuUpdateKey, data } = action;

  if (g.isNonEmptyString(uuUpdateKey)) {
    globalReducer.uuUpdate(uuUpdateKey, {
      count: data.bagCount,
    });
  }

  return next(action);
};

export default {
  updateUUState,
};
