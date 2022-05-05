"use strict";

// Dependencies.

const demoApplication = require("@vsdp/flagship-src/components/voice-assistant/demo/application");
const launch = require("@vsdp/flagship-src/templates/base/demo/launch");
const baseUtility = require("@vsdp/flagship-src/templates/base/utility");

// Public.

launch(demoApplication).then(baseUtility.markFinishFERendering);