// Dependencies.
import $ from 'jquery';
import analyticsUtility from '@vsdp/flagship-src/utilities/analytics/utility';
import { getBagCountFromAPIData } from '@vsdp/flagship-src/utilities/bag/utility';

// Public.

/**
 * A function that initiate redux store from Brastrap data.
 *
 * @param {Object} data from brastrap
 * @param {Function} uuUpdate UU.updateState() method
 * @returns {Object} all the reducers in redux store
 */
const getDataReadyFromStore = (data, uuUpdate) => {
  const htmlData = $('html').data();
  const analyticsData = analyticsUtility.buildPageData(htmlData);
  const activeContext = { ...analyticsUtility.init(data), ...analyticsData };
  return {
    configReducer: data.config,
    analyticsReducer: {
      activeContext,
      contexts: [activeContext],
    },
    globalReducer: {
      bagCount: getBagCountFromAPIData(data),
      uuUpdate,
    },
  };
};

export default getDataReadyFromStore;
