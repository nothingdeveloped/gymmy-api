"use strict";

/**
 * workoutplan router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::workoutplan.workoutplan", {
  config: {
    find: {
      middlewares: ["api::workoutplan.owner"],
    },
  },
});
