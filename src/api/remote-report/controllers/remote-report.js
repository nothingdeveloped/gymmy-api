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

  getAllPlans: async (ctx, next) => {
    try {
      const { user } = ctx.state;
      const { page, type, date } = ctx.request.query;
      // construct params
      // starting from today
      var params = {
        user_id: user.id,
        page: page,
        type: type,
        date: date,
      };
      return strapi
        .service("api::remote-report.remote-report")
        .getAllPlans(params);
    } catch (err) {
      return err;
    }
  },
  getTodayPlanImages: async (ctx, next) => {
    try {
      const { user } = ctx.state;
      const { page, type, date } = ctx.request.query;
      // construct params
      // starting from today
      var params = {
        user_id: user.id,
        page: page,
        type: type,
        date: date,
      };
      return strapi
        .service("api::remote-report.remote-report")
        .getTodayPlanImages(params);
    } catch (err) {
      return err;
    }
  },
  postPlan: async (ctx) => {
    try {
      const { user } = ctx.state;
      const reportDto = ctx.request.body;
      return strapi
        .service("api::remote-report.remote-report")
        .postPlan(user.id, reportDto);
    } catch (error) {
      throw error;
    }
  },
  updatePlan: async (ctx) => {
    try {
      const { user } = ctx.state;
      const reportDto = ctx.request.body;
      return strapi
        .service("api::remote-report.remote-report")
        .updatePlan(user.id, reportDto);
    } catch (error) {
      throw error;
    }
  },
  deletePlan: async (ctx) => {
    try {
      const { user } = ctx.state;
      const id = ctx.params.id;
      return strapi
        .service("api::remote-report.remote-report")
        .deletePlan(user.id, id);
    } catch (error) {
      throw error;
    }
  },
  deleteAllPlans: async (ctx) => {
    try {
      const { user } = ctx.state;

      return strapi
        .service("api::remote-report.remote-report")
        .deleteAllPlans(user.id);
    } catch (error) {
      throw error;
    }
  },

  deleteDayPlans: async (ctx) => {
    try {
      const { user } = ctx.state;
      return strapi
        .service("api::remote-report.remote-report")
        .deleteDayPlans(user.id, ctx.params.date);
    } catch (error) {
      throw error;
    }
  },
};
