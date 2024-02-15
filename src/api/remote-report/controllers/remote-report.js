"use strict";
// access an API service
// strapi.service('api::apiName.serviceName');

module.exports = {
  getAll: async (ctx, next) => {
    try {
      const { user } = ctx.state;
      const { page, exer_id } = ctx.request.query;
      // construct params
      var params = {
        user_id: user.id,
        page: page,
        exer_id: exer_id,
      };
      return strapi.service("api::remote-report.remote-report").findOne(params);
    } catch (err) {
      return err;
    }
  },

  save: async (ctx) => {
    try {
      const { user } = ctx.state;
      const reportDto = ctx.request.body;
      return strapi
        .service("api::remote-report.remote-report")
        .save(user.id, reportDto);
    } catch (error) {
      throw error;
    }
  },

  deleteReport: async (ctx) => {
    try {
      const { user } = ctx.state;
      const id = ctx.params.id;
      return strapi
        .service("api::remote-report.remote-report")
        .deleteById(user.id, id);
    } catch (error) {
      throw error;
    }
  },

  deleteUserReport: async (ctx) => {
    try {
      const { user } = ctx.state;

      return strapi
        .service("api::remote-report.remote-report")
        .deleteByUser(user.id);
    } catch (error) {
      throw error;
    }
  },

  deleteExerciseReport: async (ctx) => {
    try {
      const { user } = ctx.state;
      const id = ctx.params.id;
      return strapi
        .service("api::remote-report.remote-report")
        .deleteByExercise(user.id, id);
    } catch (error) {
      throw error;
    }
  },
};
