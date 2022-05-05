// shadowStore is needed to avoid infinite loop
// in keep UU and React state in sync.
export default {
  shadowStore: null,
  store: null,
};
