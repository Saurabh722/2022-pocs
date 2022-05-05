# GlobalAnalyticsProvider

<em>This readme contains two parts: how to use, what to achieve.</em>

## How to use ReduxGlobalStateProvider

### Refer to this ADR for detailed explain of the tech design:
https://confluence.victoriassecret.com/pages/viewpage.action?pageId=423249368

### React has its own analytics utility file now:
* #### src/react/utilities/analytics/utility.js

### React has its own config property now, which is totally in sync with `UU.getState("config")`.
* #### Please use the config from Redux store if you are working on a React component.

### Please consult Architecture team when using globalReducer from the redux store.

### Implementation example of analytics:
* #### src/react/roots/search-results/index.js
  * wrap your most senior parent component with <ReduxGlobalStateProvider>
  * You won't be able to use the useSelect and useDispatch hooks in the same file that the <ReduxGlobalStateProvider> is used.
* #### src/react/roots/search-results/SearchResultsApplication/index.js
  * <b>IMPORTANT</b> Import the react-redux hook from `@vsdp/flagship-src/react/components/ReduxGlobalStateProvider/utils`
  * Fire analytics with `useSelector()` and `useDispatch()` hook inside a React Component
  * Access `config` with `useSelector()`
  * A very common pattern for utag update was noticed: called `analytics-merge` then `analyticsUtility.run()`.
    * This pattern doesn't work since the `analyticsUtility.run()` function was designed to do "merge+utag update".
    * Instead of calling two analytics methods, just pass a boolean `updateUtag` in the `dispatch` call to make sure your new data will be added to `utag_data` on window.

### Implementation example of global state property (so far only `bag.count` identified):
* #### src/react/roots/masthead/index.js (display bagCount)
  * Wrap your most senior parent component with <ReduxGlobalStateProvider>

* #### src/react/roots/masthead/components/ShoppingBag/index.js (display bagCount)
  * <b>IMPORTANT</b> Import the `useSelector()` hook from `@vsdp/flagship-src/react/components/ReduxGlobalStateProvider/utils`
  * Use the hook to access bagCount from redux's `globalReducer`

* #### src/react/roots/product/index.js (update bagCount)
  * Wrap your most senior parent component with <ReduxGlobalStateProvider>

* #### src/react/roots/product/AddToBagButton/index.js (update bagCount)
  * `dispatch` after atb succeeded, pass the key of the old `UU.updateState()` action to make sure React can update the new value to UU too.
  * In the ATB case, `returnedValue` from the utility.js file has `uuUpdateKey`


## What to expect as end result for this provider - Fun reading/Architecture thinking
### /utilities/analytics/reducer.js

#### `analyticsReducer` has the activeContext and contexts array
* ###### `activeContext` is an object with the latest analytics data
* ###### `contexts` is an array with the full "history" of the context of all applications initiated without page refresh
* ###### `analytics-merge` updates `activeContext`
* ###### `analytics-merge-all` updates both `activeContext` and `contexts`
* ###### `analytics-replace` replaces the current `activeContext` with the latest item in `contexts` array (commonly seen on closing modal/drawer)
* ###### `analytics-push` adds the current `activeContext` to the `contexts` array (commonly seen on opening modal/drawer)
* ###### `analytics-pop` removes the last item from `contexts` array to create the new `contexts`; and uses the last item in the new contexts array as `activeContext` (why do we need this?)
  <code>{ activeContext: 3; contexts: [1,2,3,4,5]  } </code></br>
  ==pop==></br>
  <code> {  activeContext: 4;  contexts: [1,2,3,4] } </code> </br>

#### Thoughts
* ###### We need to define a "base" layer of analytics data for each template type.
* ###### We need a boolean to let analytics utility know whether the latest activeContext has to reach utag_data or not.
* ###### To keep data clean, we want to have the ability to only merge in the data coming with the `dispatch()` action.
* ###### To keep data clean, we want to have the ability for a component to "remove/replace" existing data points from a certain activeContext.
* ###### We want to only send signal when signal is needed.
* ###### Research needed: do we actually need to maintain the `contexts` array now that modal is just an element inserted in the page?
* ###### New play for implement analytics tagging in React approach is needed

### /utilities/analytics/utility.js

#### `run()` method will sync the latest `activeContext` to `utag_data` through `setUtagData()`

#### `push()` and `pop()` are only called by the dialog related files (do we still need this going forward?)

### accessing global state

#### Tealium that currently access to global state in UU:
* ###### Bag Count Extension: `UU.getState("config.template") === "checkout"`, `UU.getState("checkout.core.bagCount")`, `UU.getState("config.isMobile")` and `UU.getState("fabricMastheadUtilityNav.utilityNav")`
  * ###### Update for bagCount: https://stash.lbidts.com/projects/FEWD/repos/flagship/pull-requests/10991/overview
* ###### Matchbacks PDP Event Extension: `UU.getState("crossSellMatchbackProducts")`
* ###### Tell Underwire that Tealium has finished loading Extension (disabled): `UU.publish("tealium-loaded")`
* ###### UU.Publish call Tag (UID215): Underwire UU.Publish call - Must be positioned as the last tag on the list