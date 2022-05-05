// Libraries.

import React from 'react';
import { Provider } from 'react-redux';

// Dependencies.

import StateSync from './stateSync';
import store from './store';
import { Context, ShadowContext } from './utils';

// Public.

/**
 * A provider that wraps an application to provide global state values and functions
 *
 * @param {ReduxGlobalStateProvider} props - The component props
 * @returns {React.ReactNode} The rendered component
 */
export default function ReduxGlobalStateProvider({ children }) {
  return (
    <Provider store={store.store} context={Context}>
      <Provider store={store.shadowStore} context={ShadowContext}>
        <StateSync />
        {children}
      </Provider>
    </Provider>
  );
}
