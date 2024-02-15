/**
 * remote-report service
 */

const _ = require("lodash");
const mongoService = require("./zmongo");
const crypto = require("crypto");
const { errors } = require("@strapi/utils");
const { ApplicationError } = errors;

module.exports = () => ({
  calculateHMAC(data) {
    const hmac = crypto.createHmac("sha256", process.env.SECRET_KEY);
    hmac.update(data.toString());
    const hash = hmac.digest("hex");
    console.log(hash);
    return hash;
  },

  async findOne(params) {
    const { user_id, exer_id, page } = params;
    const hashedUserId = this.calculateHMAC(user_id);
    return await mongoService.getAll(hashedUserId, exer_id, page);
  },

  async save(user_id, reportDto) {
    if (_.isEmpty(reportDto) || _.isNil(reportDto.exercise_id)) {
      throw new ApplicationError("Exercise Id is required");
    }
    const hashedUserId = this.calculateHMAC(user_id);
    var report = {
      user: hashedUserId,
      exercise: reportDto.exercise_id,
      data: reportDto ?? {},
    };
    return await mongoService.create(report);
  },

  async deleteById(user_id, id) {
    if (_.isNil(id)) {
      throw new ApplicationError("Id is required");
    }
    const hashedUserId = this.calculateHMAC(user_id);
    return await mongoService.deletById(hashedUserId, id);
  },

  async deleteByUser(user_id) {
    const hashedUserId = this.calculateHMAC(user_id);
    return await mongoService.deletByUser(hashedUserId);
  },

  async deleteByExercise(user_id, exer_id) {
    if (_.isNil(exer_id)) {
      throw new ApplicationError("Exercise Id is required");
    }
    const hashedUserId = this.calculateHMAC(user_id);
    return await mongoService.deletByExercise(hashedUserId, exer_id);
  },
});
