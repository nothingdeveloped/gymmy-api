"use strict";

/**
 * user-exercise router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::user-exercise.user-exercise", {
  config: {
    find: { middlewares: ["global::reader"] },
    findOne: { middlewares: ["global::reader"] },
    create: { middlewares: ["global::writer"] },
    update: { middlewares: ["global::writer"] },
    delete: { middlewares: ["global::reader"] },
  },
});
