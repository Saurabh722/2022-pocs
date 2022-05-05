// Dependencies.

import { createContext } from 'react';
import {
  createStoreHook,
  createDispatchHook,
  createSelectorHook,
} from 'react-redux';

// Public.

export const Context = createContext();
export const ShadowContext = createContext();

export const useDispatch = createDispatchHook(ShadowContext);
export const useSelector = createSelectorHook(Context);
export const useStore = createStoreHook(Context);
export const useUUDispatch = createDispatchHook(Context);

export default {
  Context,
  ShadowContext,
  useDispatch,
  useSelector,
  useStore,
  useUUDispatch,
};
