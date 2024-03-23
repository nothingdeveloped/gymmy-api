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
      return await strapi.service("api::purchase.purchase").getCoins(user.id);
    } catch (err) {
      ctx.body = err;
    }
  },

  subscriptionStatus: async (ctx, next) => {
    try {
      const { user } = ctx.state;
      const res = await strapi
        .service("api::subscription-plan.subscription-plan")
        .find();
      // handle logic for recommended plan
      return {
        subscribed: user.subscribed,
        active: new Date(user.subscription_expire_time) > new Date(),
        expireTime: new Date(user.subscription_expire_time),
        plans: res.results.map((e) => ({
          plan_id: e.gplan_id,
          title: e.title,
          discount: e.discount,
        })),
      };
    } catch (err) {
      console.log(err);
      ctx.body = err;
    }
  },
};
