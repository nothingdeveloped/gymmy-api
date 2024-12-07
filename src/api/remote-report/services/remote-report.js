/**
 * remote-report service
 */

const _ = require("lodash");
const reportMongoService = require("./report");
const planMongoService = require("./plan");
const crypto = require("crypto");
const { errors } = require("@strapi/utils");
const { ApplicationError } = errors;

module.exports = () => ({
  calculateHMAC(data) {
    const hmac = crypto.createHmac("sha256", process.env.SECRET_KEY);
    hmac.update(data.toString());
    const hash = hmac.digest("hex");
    console.log(hash);
    // return hash;
    return data;
  },

  async findOne(params) {
    const { user_id, exer_id, page } = params;
    const hashedUserId = this.calculateHMAC(user_id);
    return await reportMongoService.getAll(hashedUserId, exer_id, page);
  },

  async save(user_id, reportDto) {
    // if (_.isEmpty(reportDto) || _.isNil(reportDto.exercise_id)) {
    //   throw new ApplicationError("Exercise Id is required");
    // }
    const hashedUserId = this.calculateHMAC(user_id);
    var report = {
      user: hashedUserId,
      ...(reportDto ?? {}),
    };
    return await reportMongoService.create(report);
  },

  async deleteById(user_id, id) {
    if (_.isNil(id)) {
      throw new ApplicationError("Id is required");
    }
    const hashedUserId = this.calculateHMAC(user_id);
    return await reportMongoService.deletById(hashedUserId, id);
  },

  async deleteByUser(user_id) {
    const hashedUserId = this.calculateHMAC(user_id);
    return await reportMongoService.deletByUser(hashedUserId);
  },

  async deleteByExercise(user_id, exer_id) {
    if (_.isNil(exer_id)) {
      throw new ApplicationError("Exercise Id is required");
    }
    const hashedUserId = this.calculateHMAC(user_id);
    return await reportMongoService.deletByExercise(hashedUserId, exer_id);
  },

  // Plan Service
  async getAllPlans(params) {
    const { user_id, page, type, date } = params;
    return await planMongoService.getAll(user_id, page, type, date);
  },

  async getTodayPlanImages(params) {
    const { user_id, page, type, date } = params;
    return await planMongoService.getTodayPlanImages(user_id, page, type, date);
  },

  async postPlan(user_id, plan) {
    plan = {
      user: user_id,
      ...plan,
    };
    return await planMongoService.create(plan);
  },

  async updatePlan(user_id, plan) {
    plan = {
      user: user_id,
      ...plan,
    };
    return await planMongoService.update(plan);
  },
  async deletePlan(user_id, id) {
    return await planMongoService.deletById(user_id, id);
  },
  async deleteAllPlans(user) {
    return await planMongoService.getAllPlans(user);
  },
  async deleteDayPlans(user, date) {
    return await planMongoService.deletDayPlan(user, date);
  },
});
