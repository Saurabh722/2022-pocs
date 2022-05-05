// Libraries.

import * as g from '@mgdp/garter';

// Dependencies.

import { combineReducers } from 'redux';
import {
  getPerformanceVariables,
  getAPTV,
  updateUtagData,
} from '@vsdp/flagship-src/react/utilities/analytics/utility';

// Private.

const updateContext = (context = {}, data) => g.merge(context, data);

// Public.

export const analyticsReducer = (state = {}, action) => {
  let newActiveContext;
  // let newContexts;
  // let splicedContexts;
  // let currentActive;
  // const lastInContexts = state.contexts?.pop();

  switch (action.type) {
    case 'react-analytics-merge':
      newActiveContext = updateContext(state.activeContext, {
        ...action.data,
        ...getPerformanceVariables(),
        activepage_test_variant: getAPTV(state.activeContext),
      });

      if (action.updateUtag) {
        updateUtagData(newActiveContext);
      }

      return g.set(state, 'activeContext', newActiveContext);
    // Uncomment as we see new use cases.
    // case 'react-analytics-merge-all':
    //   newContexts = g.mapSet(state.contexts, (context) =>
    //     updateContext(context, action.data)
    //   );
    //   return g.set(
    //     state,
    //     'activeContext',
    //     newActiveContext,
    //     'contexts',
    //     newContexts
    //   );
    // case 'react-analytics-replace':
    //   // action.data has to be a context
    //   return g.set(
    //     state,
    //     'activeContext',
    //     newActiveContext,
    //     'contexts',
    //     lastInContexts
    //   );
    // case 'react-analytics-push':
    //   // action.data has to be a context
    //   return g.set(state, 'activeContext', newActiveContext, 'contexts', [
    //     ...state.contexts,
    //     action.data,
    //   ]);
    // case 'react-analytics-pop':
    //   splicedContexts = g.splice(state.contexts, -1);
    //   currentActive = splicedContexts.pop();
    //   return g.set(
    //     state,
    //     'activeContext',
    //     currentActive,
    //     'contexts',
    //     splicedContexts
    //   );
    default:
      return state;
  }
};

export const configReducer = (state = {}, action) => {
  switch (action.type) {
    case 'config-merge':
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};

export const globalReducer = (state = {}, action) => {
  // featureFlags has to be global.
  switch (action.type) {
    case 'react-shopping-bag-count-update':
      if (state.bagCount === action.data.bagCount) {
        return state;
      }
      return g.merge(state, action.data);
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  analyticsReducer,
  configReducer,
  globalReducer,
});

export default rootReducer;
