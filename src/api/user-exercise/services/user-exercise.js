"use strict";

/**
 * user-exercise service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService(
  "api::user-exercise.user-exercise",
  ({ strapi }) => ({
    async find(...args) {
      const { results, pagination } = await super.find(...args);
      return { results, pagination };
    },

    async create(params) {
      // add the userId
      params = {
        ...params,
        data: {
          ...(params.data || {}),
          user: strapi.requestContext.get().state.user.id,
        },
      };
      console.log(params);
      const result = await super.create(params);
      return result;
    },

    async update(entityId, params) {
      // add the userId
      params = {
        ...params,
        data: {
          ...(params.data || {}),
          user: strapi.requestContext.get().state.user.id,
        },
      };
      const result = await super.update(entityId, params);

      return result;
    },

    async delete(entityId, params) {
      // add the userId
      params = {
        ...params,
        data: {
          ...(params.data || {}),
          user: strapi.requestContext.get().state.user.id,
        },
      };
      const result = await super.delete(entityId, params);
      return result;
    },
  })
);
