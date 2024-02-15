"use strict";

/**
 * A set of functions called "actions" for `purchase`
 */

module.exports = {
  verifyPurchase: async (ctx, next) => {
    try {
      const { user } = ctx.state;
      const receipt = ctx.request.body;
      return await strapi
        .service("api::purchase.purchase")
        .verifyPurchase(user.id, receipt);
    } catch (err) {
      ctx.body = err;
    }
  },

  getCoins: async (ctx, next) => {
    try {
      const { user } = ctx.state;
      console.log("entered");
      return await strapi.service("api::purchase.purchase").getCoins(user.id);
    } catch (err) {
      ctx.body = err;
    }
  },
};
