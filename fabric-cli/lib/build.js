"use strict";

;module.exports = function (config) {

return `"use strict";

// Dependencies.

const brastrapDataUtility = require("@vsdp/flagship-src/utilities/brastrap-data");

// Public.

module.exports = (partial, model) => {
	const viewModel = brastrapDataUtility(model);

	return {
		path: viewModel.page.path,
		html: partial(viewModel)
	};
};
`
};