"use strict";

/**
 * user-cat-sch router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::user-cat-sch.user-cat-sch", {
  config: {
    find: { middlewares: ["global::reader"] },
    findOne: { middlewares: ["global::reader"] },
    create: { middlewares: ["global::writer"] },
    update: { middlewares: ["global::writer"] },
    delete: { middlewares: ["global::reader"] },
  },
});
