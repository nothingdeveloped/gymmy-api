module.exports = () => {
  return async (ctx, next) => {
    const { user } = ctx.state;
    if (user.subscribed == true || user.subscriber == true) {
      // check expire time
      // if (new Date(user.subscription_expire_time) < new Date()) {
      //   console.log("EXPIRED");
      //   return ctx.badRequest("Unauthorized", { reason: "Not Premium User" });
      // }
      var query = ctx.query;
      query = {
        ...ctx.query,
        filters: {
          ...(ctx.query.filters || {}),
          user: { id: { $eq: String(user.id) } },
        },
      };
      ctx.query = query;
      await next();
    } else {
      return ctx.badRequest("Unauthorized", { reason: "Not Premium User" });
    }
  };
};
